import express from "express";
const careersAdmin = express.Router();
import dotenv from "dotenv";
import { CareerAdminDAO } from "../../dao/admin/CareerAdminDAO";
import { Career } from "../../model/Career";
import { Errors } from "../configuration/errors/Errors";
const careerDB = new CareerAdminDAO();
dotenv.config();

careersAdmin.post("/career", (req, res) => {
  const career: Career = Object.assign(new Career(), req.body);

  let missingProperty = "";

  Object.keys(career).forEach((key) => {
    if (career[key] === null || career[key] === undefined) {
      if (key !== "idCentre") missingProperty = key;
      return;
    }
  });

  if (missingProperty !== "") Errors.missingProperty(res, missingProperty);
  else
    careerDB.createCareer(career).then(
      () => {
        res.status(200).send("Career succesfully created");
      },
      (reason) => {
        Errors.resourceNotCreated(
          res,
          "Career could not be created : " + reason
        );
      }
    );
});

careersAdmin.delete("/career", (req, res) => {
  const query = require("url").parse(req.url, true).query;

  if (
    !query.idCareer ||
    !query.idCentre ||
    query.idCareer === "" ||
    query.idCentre === ""
  ) {
    res.status(400).send("Must send both id of career and id of centre");
  } else {
    careerDB.deleteCareer(query.idCareer, query.idCentre).then(
      (response) => {
        res
          .status(200)
          .send("Career was succesfully desvinculated from centre");
      },
      (reason) => {
        res.status(404).send("Career could not be desvinculated: " + reason);
      }
    );
  }
});

export default careersAdmin;
