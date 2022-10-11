import { CentrePublicDAO } from "../dao/public/CentrePublicDAO";
import { Centre } from "../model/Centre";
const centreDB = new CentrePublicDAO();

export const getCentreByParams = (query): Promise<Centre | any> => {
  return new Promise((resolve, reject) => {
    if (Object.keys(query).length === 1) {
      if (query.id) {
        centreDB.getCentre(query.id).then(
          (centre) => {
            resolve(centre);
          },
          (reason) => {
            reject(reason);
          }
        );
      } else if (query.name) {
        centreDB.getCentreByName(query.name).then(
          (centre) => {
            resolve(centre);
          },
          (reason) => {
            reject(reason);
          }
        );
      } else if (query.idCareer) {
        centreDB.getCentresByCareer(query.idCareer).then(
          (centre) => {
            resolve(centre);
          },
          (reason) => {
            reject(reason);
          }
        );
      } else if (query.nameLike) {
        centreDB.getCentresByNameLike(query.nameLike).then(
          (centre) => {
            resolve(centre);
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
