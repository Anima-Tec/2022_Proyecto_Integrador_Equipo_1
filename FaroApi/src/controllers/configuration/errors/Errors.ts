import { Response } from "express";

export class Errors {
  static unauthorized = (res: Response, message: string) =>
    res.status(401).json({
      status: 401,
      message,
    });

  static resourceNotFound = (res: Response, message: string) =>
    res.status(404).json({
      status: 404,
      message,
    });

  static resourceNotCreated = (res: Response, message: string) =>
    res.status(409).json({
      status: 409,
      message,
    });

  static resourceNotEdited = (res: Response, message: string) =>
    res.status(400).json({
      status: 400,
      message,
    });

  static uknownProperty = (res: Response, property: string) =>
    res.status(400).json({
      status: 400,
      message: "Uknwown property: " + property,
    });

  static missingProperty = (res: Response, property: string) =>
    res.status(400).json({
      status: 400,
      message: "Missing property: " + property,
    });

  static multipleParams = (res: Response) =>
    res.status(400).json({
      status: 400,
      message: "Multiple params are not allowed",
    });
}
