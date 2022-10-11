import express from "express";
const login = express.Router();
import dotenv from "dotenv";
dotenv.config();

/*It uses jwt-simple library for handling JWT*/
import { decode, encode, TAlgorithm } from "jwt-simple";
import {
  DecodeResult,
  EncodeResult,
  ExpirationStatus,
  Session,
  SessionUsername,
} from "../../model/Admin";

const LOGIN_FAILED = "Credentials are incorrect";

/*Encode/encrypt method*/
export function encodeSession(partialSession: SessionUsername): EncodeResult {
  /*Always use HS512 to sign the token*/
  const algorithm: TAlgorithm = "HS512";
  /*Determine when the token should expire*/
  const issued = Date.now();
  const fifteenMinutesInMs = 15 * 60 * 1000;
  const expires = issued + fifteenMinutesInMs;

  /*Generate a session with username, 'when' it was created and 'when' it expires info*/
  const session: Session = {
    ...partialSession,
    issued,
    expires,
  };

  return {
    token: encode(session, process.env.JWT_SECRET, algorithm),
    issued,
    expires,
  };
}

/*decode/de-crypt token method*/
export function decodeSession(tokenString: string): DecodeResult {
  /*Always use HS512 to decode the token*/
  const algorithm: TAlgorithm = "HS512";

  let result: Session;

  /*Errors handling*/
  try {
    result = decode(tokenString, process.env.JWT_SECRET, false, algorithm);
  } catch (_e) {
    const e: Error = _e;

    /*These error strings can be found here:*/
    /*https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js*/
    if (
      e.message === "No token supplied" ||
      e.message === "Not enough or too many segments"
    ) {
      return {
        type: "invalid-token",
      };
    }

    if (
      e.message === "Signature verification failed" ||
      e.message === "Algorithm not supported"
    ) {
      return {
        type: "integrity-error",
      };
    }

    /*Handle json parse errors, thrown when the payload is nonsense*/
    if (e.message.indexOf("Unexpected token") === 0) {
      return {
        type: "invalid-token",
      };
    }

    throw e;
  }

  return {
    type: "valid",
    session: result,
  };
}

/*Pretty understandable code*/
export function checkExpiration(token: Session): ExpirationStatus {
  const now = Date.now();

  if (token.expires > now) return "active";

  // Find the timestamp for the end of the token's grace period
  const threeHoursInMs = 3 * 15 * 60 * 1000;
  const threeHoursAfterExpiration = token.expires + threeHoursInMs;

  if (threeHoursAfterExpiration > now) {
    return "grace";
  } else {
    return "expired";
  }
}
