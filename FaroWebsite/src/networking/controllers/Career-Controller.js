import { Career } from "../../models/Career";
import { API_ROUTES } from "../api-routes";
import { ApiService } from "../api-service";
import { CareerSerializer } from "../serializers/career-serializer";

export default class CareerController {
  static async getAllCareers() {
    const response = await ApiService.get(API_ROUTES.CAREERS());
    let careers = response.data.map(
      (career) => new Career(CareerSerializer.deSerializeCareer(career))
    );
    return careers;
  }
  /*
  static async getCareer(id) {
    const response = await ApiService.get(API_ROUTES.CENTRE(id));
    let centre = new Career(CentreSerializer.deSerializeCentre(response.data));
    return centre;
  }
*/
  static async getCareerByFuzzyName(name) {
    const response = await ApiService.get(API_ROUTES.FUZZY_CAREER(name));
    let careers = response.data.map(
      (career) => new Career(CareerSerializer.deSerializeCareersNames(career))
    );
    return careers;
  }
}
