import { CareerPublicDAO } from "../dao/public/CareerPublicDAO";
import { Career } from "../model/Career";
const careerDB = new CareerPublicDAO();

export interface IResponse {
  message?: string;
  results?: any;
}

export const getCareersByParams = (query): Promise<Career | any> => {
  return new Promise((resolve, reject) => {
    if (Object.keys(query).length === 1) {
      if (query.id) {
        careerDB.getCareerById(query.id).then(
          (career) => {
            resolve(career);
          },
          (reason) => {
            resolve(reason);
          }
        );
      } else if (query.name) {
        careerDB.getCareerByName(query.name).then(
          (career) => {
            resolve(career);
          },
          (reason) => {
            reject(reason);
          }
        );
      } else if (query.centreId) {
        careerDB.getCareersByCentre(query.idCentre).then(
          (career) => {
            resolve(career);
          },
          (reason) => {
            reject(reason);
          }
        );
      } else if (query.nameLike) {
        careerDB.getCareersByCentre(query.nameLike).then(
          (career) => {
            resolve(career);
          },
          (reason) => {
            reject(reason);
          }
        );
      } else {
        reject("Uknown param");
      }
    } else {
      reject("Too many params");
    }
  });
};
