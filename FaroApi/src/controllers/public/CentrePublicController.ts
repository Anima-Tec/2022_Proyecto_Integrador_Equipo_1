import express from "express";
const centrePublic = express.Router();
import dotenv from "dotenv";
import { CentrePublicDAO } from "../../dao/public/CentrePublicDAO";
import { getCentreByParams } from "../../services/GetCentreService";
import { Errors } from "../configuration/errors/Errors";
const centreDB = new CentrePublicDAO();

dotenv.config();

centrePublic.get("/", (req, res) => {
  centreDB.getAllCentres().then(
    (centre) => {
      res.status(200).json(centre);
    },
    (reason) => {
      res.status(404).send("Centres could no be returned: " + reason);
    }
  );
});

centrePublic.get("/centresName", (req, res) => {
  centreDB.getAllCentresName().then(
    (centre) => {
      res.status(200).json(centre);
    },
    (reason) => {
      res.status(404).send("Centres could no be returned: " + reason);
    }
  );
});

centrePublic.get("/centresCoordinates", (req, res) => {
  centreDB.getAllCentresCoordinates().then(
    (coordinates) => {
      res.status(200).json(coordinates);
    },
    (reason) => {
      res.status(404).send("Centres could no be returned: " + reason);
    }
  );
});

centrePublic.get("/centre", (req, res) => {
  const query = require("url").parse(req.url, true).query;

  getCentreByParams(query).then(
    (centres) => {
      res.status(200).json(centres);
    },
    (reason) => {
      if (reason === "Uknown param")
        Errors.uknownProperty(res, require("url").parse(req.url, true).search);
      else if (reason === "Too many params") Errors.multipleParams(res);
      else Errors.resourceNotFound(res, reason);
    }
  );
});

export default centrePublic;
