import React, { useEffect, useState } from "react";
import "./App.css";
import {
  doLogout,
  updateUserEmail,
  updateUserTokens,
} from "./store/actions/user-actions";
import { useAppDispatch, useAppSelector } from "./store";
import axios from "axios";
import { getUserEmail, getUserTokens } from "./store/selectors/user-selectors";
import Card from "./components/Card";
import Popup from "./components/Popup";
import { EventData } from "./types/event";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const API_ROOT = "http://localhost:3000";

function App() {
  const dispatch = useAppDispatch();

  const tokens = useAppSelector(getUserTokens);
  const userEmail = useSelector(getUserEmail);

  const [events, setEvents]: [EventData[], Function] = useState([]);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code && !tokens) {
      axios
        .post(`${API_ROOT}/verify-code`, {
          code,
        })
        .then((res) => {
          dispatch(updateUserTokens(res.data.tokens));
          dispatch(updateUserEmail(res.data.userEmail));
          setEvents(res.data.events?.items as any[]);
        })
        .catch((err) => {
          console.error("auth error:", err);
        });
    } else {
      axios
        .post(`${API_ROOT}/events`, {
          tokens,
        })
        .then((res) => {
          setEvents(res.data.events?.items as any[]);
        })
        .catch((err) => {
          console.error("get events error, token is maybe expired:", err);
          dispatch(doLogout());
        });
    }
  }, []);

  const login = async () => {
    window.location.href = `${API_ROOT}/login`;
  };

  const renderItems = (event: EventData, index: number) => {
    const onClickAction = () => {
      if (events && events[index]) {
        setSelectedEvent(events[index]);
        handleClickOpen();
      }
    };
    return <Card event={event} index={index} onClickAction={onClickAction} />;
  };

  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent]: [EventData | undefined, Function] =
    useState(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    dispatch(doLogout());
    setEvents([]);
  };

  const removeAccount = async () => {
    window.confirm("Remove this account from Database?") &&
      axios
        .delete(
          `${API_ROOT}/user?email=${userEmail}&&id_token=${tokens.id_token}`
        )
        .then(() => logout())
        .catch((err) => {
          console.log(err);
          logout();
        });
  };

  return (
    <div className="App">
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.85)",
          alignItems: "center",
          justifyContent: "center",
          display: !tokens ? "flex" : "none",
        }}
      >
        {!tokens && (
          <Button
            style={{ width: "6rem", height: "3rem", backgroundColor: "cyan" }}
            onClick={login}
          >
            Login
          </Button>
        )}
      </div>
      {events && events.length > 0 && (
        <div
          style={{
            backgroundColor: "black",
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {events.map((e, i) => renderItems(e, i))}
        </div>
      )}
      {tokens && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            padding: "1rem",
          }}
        >
          <Button
            style={{ width: "6rem", height: "3rem", backgroundColor: "cyan" }}
            onClick={logout}
          >
            Log out
          </Button>
          <div style={{ width: "1rem" }} />
          <Button
            style={{
              width: "10rem",
              height: "3rem",
              backgroundColor: "red",
              color: "white",
            }}
            onClick={removeAccount}
          >
            Delete Account
          </Button>
        </div>
      )}
      <Popup selectedValue={selectedEvent} open={open} onClose={handleClose} />
    </div>
  );
}

export default App;
