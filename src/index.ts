import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const { OAuth2Client } = require("google-auth-library");

import admin from "firebase-admin";
import axios from "axios";
const serviceAccount = require("../calendar-example-f8c51-firebase-adminsdk-7y5tk-c686d4f09e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://calendar-example-f8c51.firebaseapp.com",
});

const db = admin.firestore();

const app = express();
const port = 3000;

const CLIENT_ID =
  "633927587528-p5mfqon3fo0ceu5s3cp07snd0k6hkq4j.apps.googleusercontent.com";
const oauth2Client = new OAuth2Client(
  CLIENT_ID,
  "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",
  "http://localhost:3000/oauth2callback"
);

app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: "200mb" }));

// Missing Session Management for each Client due to time-limitä
// The idea is to use express-session and use cookies

const getCalendarData = async (accessToken: string, from?: string) => {
  // List the next 10 events from the primary calendar.
  try {
    // Use the access token to access the Google Calendar API
    const calendarResponse = await axios.get(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          maxResults: 10,
          orderBy: "startTime",
          singleEvents: true,
          timeMin: from || new Date().toISOString(),
        },
      }
    );
    return calendarResponse.data;
  } catch (err) {
    console.log("err fetching calendar", err);
    throw new Error(err);
  }
};

app.get("/login", (req, res) => {
  // Generate a URL so that users can log in with Google immediately.
  console.log("redireting...");
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
  res.redirect(url);
});

app.get("/oauth2callback", async (req, res) => {
  console.log("got code", req.query.code);
  res.redirect("http://localhost:3001?code=" + req.query.code);
});

app.post("/verify-code", async (req, res) => {
  const { code } = req.body;
  console.log("checking...", code);
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const ticket = await oauth2Client.verifyIdToken({
    idToken: tokens.id_token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];

  console.log("payload", payload, userid);

  let events = [];
  try {
    events = await getCalendarData(tokens.access_token);
  } catch (err) {
    console.error(err);
  }

  try {
    // Retrieve user's profile information
    await db.collection("users").doc(payload.email).set({
      email: payload.email,
      tokens: tokens,
    });
    res.send({
      userEmail: payload.email,
      tokens,
      events,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: "Cannot get user info." });
  }
});

app.post("/events", async (req, res) => {
  const { tokens, configs } = req.body;
  console.log("checking tokens...", tokens);

  oauth2Client.setCredentials(tokens);
  let events;
  try {
    events = await getCalendarData(tokens.access_token, configs?.startTime);
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: "Cannot get events" });
  }

  res.send({ events });
});

app.delete("/user", async (req, res) => {
  const { email, id_token } = req.query;
  console.log(req.query);
  // revoke the user permission when using the API
  try {
    const usersRef = db.collection("users");
    const emailSnapshot = await usersRef.where("email", "==", email).get();
    console.log("emailSnapshot", emailSnapshot.docs[0].data());
    // Query to find user by id_token
    const tokenSnapshot = await usersRef
      .where("tokens.id_token", "==", id_token)
      .get();
    console.log("tokenSnapshot", tokenSnapshot.docs[0].data());

    // Combine both query results
    const combinedSnapshots = [...emailSnapshot.docs, ...tokenSnapshot.docs];

    // Remove duplicates (if any) and delete users
    const uniqueUserIds = new Set();
    combinedSnapshots.forEach((doc) => {
      if (!uniqueUserIds.has(doc.id)) {
        uniqueUserIds.add(doc.id);

        // Delete each unique user document
        usersRef
          .doc(doc.id)
          .delete()
          .then(() => {
            console.log(`User with ID ${doc.id} deleted`);
            res.send({ message: "OK" });
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            res.status(400).send({ message: "Error deleting User" });
          });
      }
    });
  } catch (err) {
    res.status(400).send({ message: "Cannot delete User" });
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
