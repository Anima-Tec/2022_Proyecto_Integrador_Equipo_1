import express from "express";
const centresAdmin = express.Router();
import dotenv from "dotenv";
import { CentreAdminDAO } from "../../dao/admin/CentreAdminDAO";
const centreDB = new CentreAdminDAO();
import { Centre } from "../../model/Centre";
import { Errors } from "../configuration/errors/Errors";

dotenv.config();

centresAdmin.post("/", (req, res) => {
  const centre: Centre = Object.assign(new Centre(), req.body);
  let missingProperty = "";

  Object.keys(centre).forEach((key) => {
    if (centre[key] === null || centre[key] === undefined) {
      if (key !== "idCentre") missingProperty = key;
      return;
    }
  });

  if (missingProperty !== "") Errors.missingProperty(res, missingProperty);
  else
    centreDB.createCentre(centre).then(
      () => {
        res.status(200).send("Centre succesfully created");
      },
      (reason) => {
        Errors.resourceNotCreated(
          res,
          "Centre could not be created : " + reason
        );
      }
    );
});

centresAdmin.put("/centre", (req, res) => {
  const query = require("url").parse(req.url, true).query;

  const centre: Centre = Object.assign(new Centre(), req.body);
  let missingProperty = "";

  Object.keys(centre).forEach((key) => {
    if (centre[key] === null || centre[key] === undefined) {
      if (key !== "idCentre") missingProperty = key;
      return;
    }
  });

  if (missingProperty !== "") Errors.missingProperty(res, missingProperty);
  else
    centreDB.updateCentre(query.id, centre).then(
      () => {
        res.status(200).send("Centre succesfully edited");
      },
      (reason) => {
        Errors.resourceNotEdited(res, "Centre could not be edited : " + reason);
      }
    );
});

centresAdmin.delete("/centre", (req, res) => {
  const query = require("url").parse(req.url, true).query;

  if (query.id && query.id !== "")
    centreDB.deleteCentre(query.id).then(
      () => {
        res.status(200).send("Centre was succesfully deleted");
      },
      (reason) => {
        Errors.resourceNotFound(res, "Centre could not be deleted: " + reason);
      }
    );
  else Errors.missingProperty(res, "id");
});

export default centresAdmin;
