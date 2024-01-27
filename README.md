# Google Calendar API v3 example #
This project is a challenge made by Epicbrief

## To run the proejct ##
- Clone the project
- Switch to Node.js minimum version 18
- This project uses Yarn,. If it has not been installed, please run `npm i -g yarn` (on Windows you might need to open Powershell and run `$ Set-ExecutionPolicy Unrestricted`)
- `yarn start` to start the server at port 3000
- `cd client-side && yarn start` and choose Yes to start the client at port 3001 (!Important: The client needs to run on 3001 to be able to work)

## Checkpoints ##
- The Google API app has been set up with suitable scopes and all 3 Epicbrief accounts have been added
- Using OAuth2 to let users authenticate with the API
- Fetching 10 calendar events from Google Calendar API via Axios
- User's crendentials are retrieved and analyzed using `id_token` then stored into Firestore database
- The credentials are also saved into the Client Local Storage with the help of Redux Persist
- If The crendetials are found from the client side, automatcally check and retriveing Calendar Events data
- There is a Log out button and a Delete Account option to remove the user from the Firestore database

## Future Plan ##
- I can deploy it the Digital Ocean's VPS and link it with my custom domain, or, having it hosted on a EC2 in AWS.
- Writing Unit Tests and Integration Tests
- Create a CI pipeline with built-in CI pipeline feature provided from Github (I have been doing similar things but with Bitbucket) that triggers after ever commit/PR created
  + Build the Docker containers for the client and server
  + Run tests
- Create a CD pipeline using AWS CodeDeploy
  + Storing keys and secrets securely
  + Easy monitoring with provided services
  + Mananging team memebrs permissions
  + Environment-based: Create seperate environment for Development, Staging and Production
  + Well-supported for Node.js

 ## After words ##
 - I have never used Firestore before
 - I know that I should have used the possibility of `refresh_token` for the Authentication process, but I haven't been able to managed a good scenario with it
