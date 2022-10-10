import { OkPacket } from "mysql2";
import { dbPublic } from "../../databaseCon/Database";
import { Career, CareerDB } from "../../model/Career";
import { selectCount } from "../../model/Generics";
import { KeywordDAO } from "./KeywordDAO";
const keywordDB = new KeywordDAO();

/*-
Only first method (getCareerById) is explained in detail,
every other method has only very specific comments
in order to avoid unnecessary excesive documentation
-*/

export class CareerDAO {
  /*Method of type Promise of type Career*/
  getCareerById(careerId: number): Promise<Career> {
    let career: Career;
    /*Database request are handled with Promises*/
    return new Promise((/*callbacks*/ resolve, reject) => {
      /*Database requests are handled with Promises*/
      /*mysql2 driver requires classes that extend RowDataPacket*/
      dbPublic.query<CareerDB[]>(
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

  getAllCareers(): Promise<Career[]> {
    return new Promise((resolve, reject) => {
      dbPublic.query<CareerDB[]>("select * from CAREER", async (err, res) => {
        if (err) reject(err);
        else {
          /*In order to create an array of type careers we must first get all careers
          Promise.all is a method from promise that will multiple allow asynchronic call*/
          const careers = await Promise.all(
            res.map((career) => this.getCareerById(career.idCareer))
          );
          resolve(careers);
        }
      });
    });
  }

  getCareerByName(careerName: string): Promise<Career> {
    return new Promise((resolve, reject) => {
      dbPublic.query<CareerDB[]>(
        "SELECT * FROM CAREER WHERE careerName = ?",
        [careerName],
        (err, res) => {
          if (err) reject(err);
          else {
            /*In order to avoid repitive code, this method only gets the id from row
            that matches that name and then calls the 'getById' */
            if (res?.[0] !== undefined) {
              this.getCareerById(res?.[0].idCareer).then((career) => {
                resolve(career);
              });
            } else {
              reject("Career not found");
            }
          }
        }
      );
    });
  }

  /*Get all careers that are related to a specific centreId*/
  getCareersByCentre(centreId: number): Promise<Career[]> {
    return new Promise((resolve, reject) => {
      dbPublic.query<CareerDB[]>(
        "select idCareer from CENTRE_CAREER where idCentre = ?",
        [centreId],
        async (err, res) => {
          if (err) reject(err);
          else {
            if (res?.[0] !== undefined) {
              await Promise.all(
                res.map((career) => this.getCareerById(career.idCareer))
              ).then((careers) => resolve(careers));
            } else reject(Error("No_careers"));
          }
        }
      );
    });
  }
}
