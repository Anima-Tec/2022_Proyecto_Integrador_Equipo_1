import express from "express";
const centrePublic = express.Router();
import dotenv from "dotenv";
import { CentrePublicDAO } from "../../dao/public/CentrePublicDAO";
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
  const byId = query.id ? true : false;
  const byName = query.name ? true : false;
  const byCareer = query.idCareer ? true : false;

  if (byName && !byId && !byCareer) {
    centreDB.getCentreByName(query.name).then(
      (centre) => {
        res.status(200).json(centre);
      },
      (reason) => {
        res.status(404).send("Centre could no be returned: " + reason);
      }
    );
  } else if (byId && !byName && !byCareer) {
    centreDB.getCentre(query.id).then(
      (centre) => {
        res.status(200).json(centre);
      },
      (reason) => {
        res.status(404).send("Centre could no be returned: " + reason);
      }
    );
  } else if (byCareer && !byName && !byId) {
    centreDB.getCentresByCareer(query.idCareer).then(
      (centres) => {
        res.status(200).json(centres);
      },
      (reason) => {
        res.status(404).send("Centre could no be returned: " + reason);
      }
    );
  } else {
    res.status(400).send("Must send either an id, a name, or a career");
  }
});

export default centrePublic;
