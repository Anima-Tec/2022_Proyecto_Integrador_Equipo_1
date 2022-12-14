import { OkPacket } from "mysql2";
import { dbAdmin } from "../../databaseCon/Database";
import { Career, CareerDB } from "../../model/Career";
import { selectCount } from "../../model/Generics";
import { CareerPublicDAO } from "../public/CareerPublicDAO";
const careerDB = new CareerPublicDAO();
import { KeywordDAO } from "./KeywordAdminDAO";
const keywordDB = new KeywordDAO();

/*-
Only first method (getCareerById) is explained in detail,
every other method has only very specific comments
in order to avoid unnecessary excesive documentation
-*/

export class CareerAdminDAO {
  /*Method of type Promise of type Career*/
  getCareerById(careerId: number): Promise<Career> {
    let career: Career;
    /*Database request are handled with Promises*/
    return new Promise((/*callbacks*/ resolve, reject) => {
      /*Database requests are handled with Promises*/
      /*mysql2 driver requires classes that extend RowDataPacket*/
      dbAdmin.query<CareerDB[]>(
        /*Raw mysql query*/
        "SELECT * FROM CAREER WHERE idCareer = ?",
        /*Every sent paramether will match every '?' mark*/
        [careerId],
        /*callback*/
        (err, res) => {
          /*If error then reject the promise*/
          if (err) reject(err);
          else {
            /*if something was returned from database*/
            if (res?.[0] !== undefined) {
              /*Just an assistant variable*/
              const careerR = res?.[0];
              /*Create a new career (type Career)*/
              career = new Career(
                careerR.idCareer,
                careerR.careerName,
                careerR.careerDescription,
                careerR.grade,
                careerR.duration
              );
              /*then call method getKeywords from keywordDAO in order to set the keywords of the career*/
              keywordDB
                .getKeywordsByCareer(career.getIdCareer())
                .then((keywords) => {
                  career.setKeywords(keywords);
                  resolve(career);
                });
              /*If nothing was returned from database*/
            } else {
              reject("Career not found");
            }
          }
        }
      );
    });
  }

  vinculateCentreCareer(idCentre: number, idCareer: number) {
    return new Promise((resolve, reject) => {
      dbAdmin.query<OkPacket>(
        "insert into CENTRE_CAREER (idCentre, idCareer) values(?,?)",
        [idCentre, idCareer],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  clearCareers(idCentre: number): Promise<selectCount[]> {
    return new Promise(async (resolve, reject) => {
      const careers = await careerDB.getAllCareers();
      careers.forEach((career) => {
        dbAdmin.query<selectCount[]>(
          "select count(idCareer) as countResult from CENTRE_CAREER where idCareer=?",
          [career.getIdCareer()],
          async (err, res) => {
            if (err) reject(err);
            else {
              if (res?.[0].countResult === 0) {
                await this.deleteCareer(career.getIdCareer(), idCentre);
              }
              resolve(res);
            }
          }
        );
      });
    });
  }

  createCareerVinculateCentre(
    careers: Career[],
    centreId: number
  ): Promise<OkPacket> {
    return new Promise((resolve, reject) => {
      careers.forEach((career) => {
        dbAdmin.query<OkPacket>(
          "insert into CAREER (careerName, careerDescription, degree, duration) values(?,?,?,?)",
          [
            career.getCareerName(),
            career.getCareerDescription(),
            career.getDegree(),
            career.getDuration(),
          ],
          (err, res) => {
            if (err) {
              /*If there's already a career with that name*/
              if (err.code === "ER_DUP_ENTRY") {
                /*then get that career*/
                careerDB
                  .getCareerByName(career.getCareerName())
                  .then((c) => {
                    /*and just vinculate it to the centre*/
                    this.vinculateCentreCareer(centreId, c.getIdCareer());
                  })
                  .then(() => resolve(res));
              } else {
                reject(err);
              }
            } else {
              /*No errors from db*/
              /*save keywords in variable*/
              const careerKeywords = career.getKeywords();
              if (careerKeywords !== undefined) {
                /*for every keyword in array*/
                careerKeywords.forEach((keyword) => {
                  /*vinculate them to the career*/
                  keywordDB.vinculateCareerKeyword(keyword, res.insertId);
                });
              }
              this.vinculateCentreCareer(centreId, res.insertId);
              resolve(res);
            }
          }
        );
      });
    });
  }

  createCareer(career: Career): Promise<number> {
    return new Promise((resolve, reject) => {
      dbAdmin.query<OkPacket>(
        "insert into CAREER (careerName, careerDescription, degree, duration) values(?,?,?,?)",
        [
          career.getCareerName(),
          career.getCareerDescription(),
          career.getDegree(),
          career.getDuration(),
        ],
        (err, res) => {
          if (err) reject(err);
          else {
            const careerKeywords = career.getKeywords();
            if (careerKeywords !== undefined) {
              careerKeywords.forEach(async (keyword) => {
                await keywordDB.vinculateCareerKeyword(keyword, res.insertId);
              });
            }
            resolve(res.insertId);
          }
        }
      );
    });
  }

  deleteCareer(idCareer: number, idCentre: number): Promise<number> {
    return new Promise((resolve, reject) => {
      dbAdmin.query<OkPacket>(
        "call DBFiller_Career_DesvinculateCentre(?,?)",
        [idCareer, idCentre],
        (err, res) => {
          if (err) reject(err);
          else {
            res.affectedRows === 0
              ? reject(Error("Centre or careeer not found"))
              : keywordDB.clearKeywords();
            resolve(res.affectedRows);
          }
        }
      );
    });
  }
}
