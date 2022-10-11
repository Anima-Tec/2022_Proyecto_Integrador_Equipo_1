import { DecodeResult, ExpirationStatus, Session } from "../../../model/Admin";
import { NextFunction, Request, Response } from "express";
import { Errors } from "../errors/Errors";
import { checkExpiration, decodeSession, encodeSession } from "../JWTConfig";

export function JwtMiddleware(req: Request, res: Response, next: NextFunction) {
  /*Unauthorized message*/

  /*Declaring headers names for Token handling*/
  const requestHeader = "X-JWT-Token";
  const responseHeader = "X-Renewed-JWT-Token";
  const header = req.header(requestHeader);

  /*If headers not present*/
  if (!header) {
    Errors.unauthorized(res, `Required ${requestHeader} header not found.`);
    return; /*end*/
  }

  /*Decode the token*/
  const decodedSession: DecodeResult = decodeSession(header);

  /*Handle decoded Token*/
  if (
    decodedSession.type === "integrity-error" ||
    decodedSession.type === "invalid-token"
  ) {
    Errors.unauthorized(
      res,
      `Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`
    );
    return; /*end*/
  }

  /*Check expiration*/
  const expiration: ExpirationStatus = checkExpiration(decodedSession.session);

  /*Handle expiration*/
  if (expiration === "expired") {
    Errors.unauthorized(
      res,
      `Authorization token has expired. Please create a new authorization token.`
    );
    return; /*end*/
  }

  /*Generate a session*/
  let session: Session;

  if (expiration === "grace") {
    /*Automatically renew the session and send it back with the response*/
    const { token, expires, issued } = encodeSession(decodedSession.session);
    session = {
      ...decodedSession.session,
      expires,
      issued,
    };

    res.setHeader(responseHeader, token);
  } else {
    session = decodedSession.session;
  }

  /*Set the session on response.locals object for routes to access*/
  res.locals = {
    ...res.locals,
    session,
  };

  /*Request has a valid or renewed session. Call next to continue to the authenticated route handler*/
  next();
}
