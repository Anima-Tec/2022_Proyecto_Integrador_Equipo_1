import { Career } from "../model/Career";
import { CareerAdminDAO } from "../dao/admin/CareerAdminDAO";
import { CareerPublicDAO } from "../dao/public/CareerPublicDAO";
const careerPublicDB = new CareerPublicDAO();
const careerAdminDB = new CareerAdminDAO();

export const createCareerVinculateCentreService = (
  careers: Career[],
  centreId: number
) => {
  return new Promise((resolve, reject) => {
    careers.forEach((career) => {
      careerAdminDB.createCareer(career).then(
        (careerId) => {
          careerAdminDB
            .vinculateCentreCareer(centreId, careerId)
            .then(() => resolve(centreId));
        },
        (err) => {
          if (err.code === "ER_DUP_ENTRY") {
            careerPublicDB
              .getCareerByName(career.getCareerName())
              .then(async (car) => {
                await careerAdminDB.vinculateCentreCareer(
                  centreId,
                  car.getIdCareer()
                );
              })
              .then(() => resolve(resolve));
          } else reject(err);
        }
      );
    });
    resolve(centreId);
  });
};
