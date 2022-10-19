import { Career } from "../../models/Career"
import { API_ROUTES } from "../api-routes"
import { ApiService } from "../api-service"
import { CareerSerializer } from "../serializers/career-serializer"

export default class CareerController {
  static async getCareer(id) {
    const response = await ApiService.get(API_ROUTES.CENTRE(id))
    const career = new Career(CareerSerializer.deSerializeCareer(response.data))
    return career
  }

  static async getCareerByFuzzyName(name) {
    const response = await ApiService.get(API_ROUTES.FUZZY_CAREER(name))
    const careers = response.data.map(
      (career) => new Career(CareerSerializer.deSerializeCareersNames(career))
    )
    return careers
  }

  static async deleteCareer(idCareer, idCentre) {
    const header = {
      headers: {
        "X-JWT-Token": localStorage.getItem("token"),
      },
    }
    const response = await ApiService.delete(
      API_ROUTES.DELETE_CAREER(idCareer, idCentre),
      null,
      header
    )
    return response.status
  }
  static async getAllCareers() {
    const response = await ApiService.get(API_ROUTES.CAREERS())
    const careers = response.data.map((career) => new Career(CareerSerializer.deSerializeCareer(career)))
    return careers
  }
}
