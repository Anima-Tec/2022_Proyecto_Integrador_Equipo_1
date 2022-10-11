import { OkPacket } from "mysql2";
import {
  Centre,
  CentreCoordinates,
  CentreDB,
  CentreScheduleDB,
  schoolarLevelDB,
} from "../../model/Centre";
import { db } from "../../databaseCon/Database";
import { Career } from "../../model/Career";
//import { CareerDAO } from "./CareerDAO";
import { resolve } from "path";
import { selectCount } from "../../model/Generics";
import { CareerDAO } from "./CareerDAO";
const careerDB = new CareerDAO();

/*-
Only first method (getCareerById) is explained in detail,
every other method has only very specific comments
in order to avoid unnecessary excesive documentation
-*/

export class CentreDAO {
  /*Method of type Promise of type Centre*/
  getCentre(id: number): Promise<Centre | undefined> {
    let centre: Centre;
    /*Database request are handled with Promises*/
    return new Promise((resolve, reject) => {
      /*Database requests are handled with Promises*/
      /*mysql2 driver requires classes that extend RowDataPacket*/
      db.query<CentreDB[]>(
        /*Raw mysql query*/
        "select idCentre, centreName, free, addressStreet, addressNumber, latitude, longitude, phoneNumber, schoolarLevel, group_concat(centreSchedule) as centreSchedules from centre natural left join centre_schedules natural left join schoolarlevel natural left join SCHEDULES where idCentre=?",
        /*Every sent paramether will match every '?' mark*/
        [id],
        /*callback*/
        async (err, res) => {
          /*If error then reject the promise*/
          if (err) reject(err);
          else {
            /*if something was returned from database*/
            if (res?.[0].centreName !== null) {
              /*Just an assistant variable*/
              const centreData = res?.[0];
              /*Create a new centre (type Centre)*/
              centre = new Centre(
                centreData.idCentre,
                centreData.centreName,
                Boolean(centreData.free),
                centreData.addressStreet,
                centreData.addressNumber,
                centreData.latitude,
                centreData.longitude,
                centreData.centreSchedules.split(","),
                centreData.schoolarLevel,
                centreData.phoneNumber
              );
              /*then call method getCareers from careerDB in order to set the careers of the centre*/
              await careerDB
                .getCareersByCentre(centre.getIdCentre())
                .then((careers) => {
                  centre.setCareers(careers);
                })
                .catch((err) => resolve(centre));
              resolve(centre);
            } else {
              reject("Centre not found");
            }
          }
        }
      );
    });
  }

  getAllCentres(): Promise<Centre[]> {
    return new Promise((resolve, reject) => {
      db.query<CentreDB[]>("SELECT * FROM CENTRE", async (err, res) => {
        if (err) reject(err);
        else {
          /*In order to create an array of type centre we must first get all centres.
          Promise.all is a method from promise that will multiple allow asynchronic call*/
          const centres = await Promise.all(
            res.map((centre) => this.getCentre(centre.idCentre))
          );
          resolve(centres);
        }
      });
    });
  }

  getAllCentresName(): Promise<Centre[]> {
    const centres: Centre[] = [];
    return new Promise((resolve, reject) => {
      db.query<CentreDB[]>(
        "SELECT idCentre, centreName FROM CENTRE",
        (err, res) => {
          if (err) reject(err);
          else {
            res.forEach((cen) => {
              centres.push(new Centre(cen.idCentre, cen.centreName));
            });
            resolve(centres);
          }
        }
      );
    });
  }

  getCentreByName(centreName: string): Promise<Centre | undefined> {
    return new Promise((resolve, reject) => {
      db.query<CentreDB[]>(
        "select * from CENTRE natural join CAREER where centreName = ?",
        [centreName],
        (err, res) => {
          if (err) reject(err);
          else {
            if (res?.[0] !== undefined) {
              /*In order to avoid repitive code, this method only gets the id from row
            that matches that name and then calls the 'getById' */
              this.getCentre(res?.[0].idCentre).then((centre) => {
                resolve(centre);
              });
            } else {
              reject("Centre not found");
            }
          }
        }
      );
    });
  }

  getAllCentresCoordinates(): Promise<CentreCoordinates[]> {
    const centres: CentreCoordinates[] = [];
    return new Promise((resolve, reject) => {
      db.query<CentreCoordinates[]>(
        "SELECT idCentre, latitude, longitude FROM CENTRE",
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  /*Get centres that are related to a specific career*/
  getCentresByCareer(idCareer: number): Promise<Centre | undefined> {
    return new Promise((resolve, reject) => {
      db.query<CentreDB[]>(
        "select idCentre from CAREER natural join CENTRE_CAREER where idCareer = ?",
        [idCareer],
        (err, res) => {
          if (err) reject(err);
          else {
            if (res?.[0]) {
              this.getCentre(res?.[0].idCentre).then((centre) => {
                resolve(centre);
              });
            } else {
              reject("Centre not found");
            }
          }
        }
      );
    });
  }
}
