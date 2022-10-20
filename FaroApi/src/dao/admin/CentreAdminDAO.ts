import { OkPacket } from "mysql2";
import { Centre, CentreDB } from "../../model/Centre";
import { dbAdmin } from "../../databaseCon/Database";
import { Career } from "../../model/Career";
import { CareerAdminDAO } from "./CareerAdminDAO";
import { CareerPublicDAO } from "../public/CareerPublicDAO";
import { createCareerVinculateCentreService } from "../../services/CreateCareerVinculateCentreService";
import { CentrePublicDAO } from "../public/CentrePublicDAO";
const centrePublicDB = new CentrePublicDAO();
const careerAdminDB = new CareerAdminDAO();
const careerPublicDB = new CareerPublicDAO();

/*-
Only first method (getCareerById) is explained in detail,
every other method has only very specific comments
in order to avoid unnecessary excesive documentation
-*/

export class CentreAdminDAO {
  vinculateCentreSchoolarLevel(idCentre: number, scholarLevel: string) {
    return new Promise((resolve, reject) => {
      dbAdmin.query<OkPacket>(
        "call DBFiller_Centre_VinculateSchoolarLevel(?,?)",
        [idCentre, scholarLevel],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  createCentre(centre: Centre): Promise<Centre> {
    const centreCareers = centre.getCareers().map((career) => {
      return Object.assign(new Career(), career);
    });

    return new Promise((resolve, reject) => {
      dbAdmin.query<OkPacket>(
        "insert into CENTRE (centreName, free, addressStreet, addressNumber, latitude, longitude, phoneNumber) values(?,?,?,?,?,?,?)",
        [
          centre.getCentreName(),
          centre.isFree(),
          centre.getAddressStreet(),
          centre.getAddressNumber(),
          centre.getLatitude(),
          centre.getLongitude(),
          centre.getPhoneNumber(),
        ],
        async (err, res) => {
          if (err) reject(err);
          else {
            /*For every given schedule vinculate it to the centre*/
            await this.vinculateCentreSchedules(
              res.insertId,
              centre.getCentreSchedules()
            );
            /*For the given schoolar level, vinculate it to the centre*/
            await this.vinculateCentreSchoolarLevel(
              res.insertId,
              centre.getSchoolarLevel()
            );
            /*For every given career vinculate it to the centre*/
            if (centreCareers.length > 0)
              await createCareerVinculateCentreService(
                centreCareers,
                res.insertId
              );

            centrePublicDB
              .getCentre(res.insertId)
              .then((centre) => resolve(centre!))
              .catch(reject);
          }
        }
      );
    });
  }

  deleteSchedules(idCentre: number) {
    return new Promise((resolve, reject) => {
      dbAdmin.query<OkPacket>(
        "delete FROM CENTRE_SCHEDULES where idCentre=?",
        [idCentre],
        (err, res) => {
          if (err) reject(err);
          else {
            resolve(res);
          }
        }
      );
    });
  }

  vinculateCentreSchedules(idCentre: number, schedule: string[]) {
    return new Promise((resolve, reject) => {
      schedule.forEach((sch) => {
        dbAdmin.query<OkPacket>(
          "call DBFiller_Centre_VinculateSchedules(?,?)",
          [idCentre, sch],
          (err, res) => {
            if (err) reject(err);
            else resolve(res);
          }
        );
      });
    });
  }

  updateSchedules(schedules: string[], idCentre: number) {
    return new Promise((resolve, reject) => {
      this.deleteSchedules(idCentre).then(() => {
        this.vinculateCentreSchedules(idCentre, schedules).then((res) => {
          resolve(res);
        });
      });
    });
  }

  updateCentre(idCentre: number, centre: Centre): Promise<Centre> {
    const centreCareers = centre.getCareers().map((career) => {
      return Object.assign(new Career(), career);
    });

    return new Promise((resolve, reject) => {
      dbAdmin.query<OkPacket>(
        "update CENTRE set centreName=?, free=?, addressStreet=?, addressNumber=?, latitude=?, longitude=?, phoneNumber=? where idCentre = ?",
        [
          centre.getCentreName(),
          centre.isFree(),
          centre.getAddressStreet(),
          centre.getAddressNumber(),
          centre.getLatitude(),
          centre.getLongitude(),
          centre.getPhoneNumber(),
          idCentre,
        ],
        async (err, res) => {
          if (err) reject(err);
          else {
            await this.vinculateCentreSchoolarLevel(
              idCentre,
              centre.getSchoolarLevel()
            );
            await this.updateSchedules(centre.getCentreSchedules(), idCentre);
            if (centreCareers.length > 0)
              await createCareerVinculateCentreService(centreCareers, idCentre);
            centrePublicDB
              .getCentre(idCentre)
              .then((centre) => resolve(centre!))
              .catch(reject);
          }
        }
      );
    });
  }

  deleteCentre(idCentre: number): Promise<number> {
    return new Promise((resolve, reject) => {
      dbAdmin.query<OkPacket>(
        "call DBFiller_Centre_Delete(?)",
        [idCentre],
        async (err, res) => {
          if (err) reject(err);
          else {
            if (res.affectedRows === 0) reject(Error("Centre not found"));
            else {
              await this.deleteSchedules(idCentre);
              await careerAdminDB.clearCareers(idCentre);
              resolve(res.affectedRows);
            }
          }
        }
      );
    });
  }
}
