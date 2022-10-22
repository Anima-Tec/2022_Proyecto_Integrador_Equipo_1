import { Centre, CentreCoordinates, CentreDB } from "../../model/Centre";
import { dbPublic } from "../../databaseCon/Database";
import { CareerPublicDAO } from "./CareerPublicDAO";
import { Career } from "../../model/Career";
const careerDB = new CareerPublicDAO();

/*-
Only first method (getCareerById) is explained in detail,
every other method has only very specific comments
in order to avoid unnecessary excesive documentation
-*/

export class CentrePublicDAO {
  /*Method of type Promise of type Centre*/
  getCentre(id: number): Promise<Centre | undefined> {
    let centre: Centre;
    const careersArr = new Array<Career>();
    /*Database request are handled with Promises*/
    return new Promise((resolve, reject) => {
      /*Database requests are handled with Promises*/
      /*mysql2 driver requires classes that extend RowDataPacket*/
      dbPublic.query<CentreDB[]>(
        /*Raw mysql query*/
        "SELECT * FROM CENTRES_VW where idCentre=?",
        /*Every sent paramether will match every '?' mark*/
        [id],
        /*callback*/
        async (err, res) => {
          /*If error then reject the promise*/
          if (err) {
            reject(err);
          } else {
            /*if something was returned from database*/
            if (res?.[0] !== undefined) {
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
                  careers.length > 0
                    ? centre.setCareers(careers)
                    : centre.setCareers(careersArr);
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
      dbPublic.query<CentreDB[]>(
        "SELECT idCentre FROM CENTRES_VW",
        async (err, res) => {
          if (err) reject(err);
          else {
            /*In order to create an array of type centre we must first get all centres.
          Promise.all is a method from promise that will multiple allow asynchronic call*/
            const centres = await Promise.all(
              res.map((centre) => this.getCentre(centre.idCentre))
            );
            resolve(centres);
          }
        }
      );
    });
  }

  getAllCentresName(): Promise<Centre[]> {
    const centres: Centre[] = [];
    return new Promise((resolve, reject) => {
      dbPublic.query<CentreDB[]>(
        "SELECT idCentre, centreName FROM CENTRES_VW",
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
      dbPublic.query<CentreDB[]>(
        "select * from CENTRES_VW where centreName = ?",
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

  getCentresCoordinates(idCentre: number): Promise<CentreCoordinates[]> {
    return new Promise((resolve, reject) => {
      dbPublic.query<CentreCoordinates[]>(
        "SELECT idCentre, latitude, longitude FROM CENTRES_VW WHERE idCentre = ?",
        [idCentre],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  getAllCentresCoordinates(): Promise<CentreCoordinates[]> {
    return new Promise((resolve, reject) => {
      dbPublic.query<CentreCoordinates[]>(
        "SELECT idCentre, centreName, latitude, longitude FROM CENTRES_VW",
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
      dbPublic.query<CentreDB[]>(
        "select idCentre from CAREERS_VW natural join CENTRE_CAREER where idCareer = ?",
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

  getCentresByFilter(queryFilter: string, queryParams: any[]) {
    const centres: Centre[] = [];
    return new Promise((resolve, reject) => {
      dbPublic.query<CentreDB[]>(queryFilter, queryParams, async (err, res) => {
        if (err) reject(err);
        else {
          /*
          res.forEach((cen) => {
            centres.push(new Centre(cen.idCentre, cen.centreName));
          });*/
          const centres = await Promise.all(
            res.map((centre) => this.getCentre(centre.idCentre))
          );
          resolve(centres);
        
        }
      });
    });
  }

  getCentresByNameLike(
    centreName: string
  ): Promise<CentreCoordinates[] | undefined> {
    return new Promise((resolve, reject) => {
      dbPublic.query<CentreCoordinates[]>(
        "select idCentre, centreName, latitude, longitude from CENTRES_VW where centreName like ?",
        [centreName + "%"],
        async (err, res) => {
          if (err) reject(err);
          else {
            resolve(res);
          }
        }
      );
    });
  }
}
