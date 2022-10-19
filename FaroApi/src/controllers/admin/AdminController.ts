import express from "express";
const login = express.Router();
import dotenv from "dotenv";
import { SessionUsername } from "../../model/Admin";
import { encodeSession } from "../configuration/JWTConfig";
import { Errors } from "../configuration/errors/Errors";
dotenv.config();

/*Login method, pretty simple*/
login.post("/", (req, res) => {
  let session: SessionUsername;
  if (
    /*If credentials are correct. */
    req.body.username === process.env.DB_USER &&
    req.body.password === process.env.PASSWORD
  ) {
    /*Generate a session and send the token as response*/
    session = {
      username: process.env.DB_USER,
    };
    res.json(encodeSession(session).token);
  } else {
    Errors.unauthorized(res, "Credentials are invalid");
  }
});

export default login;
