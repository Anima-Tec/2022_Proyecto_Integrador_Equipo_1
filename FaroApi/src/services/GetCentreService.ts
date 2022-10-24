import { CentrePublicDAO } from "../dao/public/CentrePublicDAO";
import { Centre } from "../model/Centre";
const centreDB = new CentrePublicDAO();

export const getCentreByParams = (query): Promise<Centre | any> => {
  return new Promise((resolve, reject) => {
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
    } else {
      let queryFilter = "select DISTINCT idCentre, centreName from CENTRES_VW natural join CENTRE_CAREER natural join CAREERS_VW where ";
      const queryParams = []

      queryFilter = queryFilter + (query.free ? "free=? " : "free=free ");
      if(query.free) query.free==='true' ? queryParams.push(true) : queryParams.push(false);

      queryFilter = queryFilter + (query.schoolarLevel ? "and schoolarLevel=? " : "and schoolarLevel=schoolarLevel ");
      if(query.schoolarLevel) queryParams.push(query.schoolarLevel);

      queryFilter = queryFilter + (query.centreSchedules ? "and centreSchedules like ? " : "and centreSchedules = centreSchedules ");
      if(query.centreSchedules) queryParams.push("%" + query.centreSchedules + "%");

      queryFilter = queryFilter + (query.idCareer ? "and idCareer = ? " : "and idCareer = idCareer ");
      if(query.idCareer) queryParams.push(query.idCareer);

      queryFilter = queryFilter + (query.keyword ? "and keywords like ? " : "and keywords=keywords ");
      if(query.keyword) queryParams.push("%" + query.keyword + "%");      

      centreDB
        .getCentresByFilter(
          queryFilter,
          queryParams,
        )
        .then(
          (centre) => {
            resolve(centre);
          },
          (reason) => {
            reject(reason);
          }
        );
    }
  });

};
