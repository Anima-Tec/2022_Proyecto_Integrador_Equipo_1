import express from "express";
const careersPublicController = express.Router();
import dotenv from "dotenv";
import { CareerPublicDAO } from "../../dao/public/CareerPublicDAO";
const careerDB = new CareerPublicDAO();
dotenv.config();
import { Errors } from "../configuration/errors/Errors";
import { getCareersByParams } from "../../services/GetCareerService";

careersPublicController.get("/", (req, res) => {
  careerDB.getAllCareers().then(
    (careers) => {
      res.status(200).json(careers);
    },
    (reason) => {
      Errors.resourceNotFound(res, "Careers could not be returned " + reason);
    }
  );
});

careersPublicController.get("/career", (req, res) => {
  const query = require("url").parse(req.url, true).query;

  getCareersByParams(query).then(
    (careers) => {
      res.status(200).json(careers);
    },
    (reason) => {
      if (reason === "Uknown param")
        Errors.uknownProperty(res, require("url").parse(req.url, true).search);
      else if (reason === "Too many params") Errors.multipleParams(res);
      else Errors.resourceNotFound(res, reason);
    }
  );
});

export default careersPublicController;
