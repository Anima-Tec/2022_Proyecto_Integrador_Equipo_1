import { Centre } from "../../models/Centre"
import { addQueryParams } from "../../utils/functions"
import { API_ROUTES } from "../api-routes"
import { ApiService } from "../api-service"
import { CentreSerializer } from "../serializers/centre-serializer"

export default class CentreController {
  static async getCentresCoordinates() {
    const response = await ApiService.get(API_ROUTES.CENTRES_COORDINATES())
    const centres = response.data.map(
      (centre) =>
        new Centre(CentreSerializer.deSerializeCentreCoordinates(centre))
    );
    return centres;
  }

  static async getCentre(id) {
    const response = await ApiService.get(API_ROUTES.CENTRE(id));
    const centre = new Centre(
      CentreSerializer.deSerializeCentre(response.data)
    );
    return centre;
  }

  static async getCentreByFuzzyName(name) {
    const response = await ApiService.get(API_ROUTES.FUZZY_CENTRE(name));
    const centres = response.data.map(
      (centre) =>
        new Centre(CentreSerializer.deSerializeCentreCoordinates(centre))
    );
    return centres;
  }

  static async getCentres() {
    const response = await ApiService.get(API_ROUTES.CENTRES());
    return response.data.map((centre) => centre);
  }

  static async deleteCentre(id) {
    const header = {
      headers: {
        "X-JWT-Token": localStorage.getItem("token"),
      },
    };
    const response = await ApiService.delete(
      API_ROUTES.CENTRE(id),
      null,
      header
    );
    return response.status;
  }

  static async createCentre(body) {
    const header = {
      headers: {
        "X-JWT-Token": localStorage.getItem("token"),
      },
    };
    const response = await ApiService.post(
      API_ROUTES.CENTRE_BASE(),
      body,
      header
    );
    return response.status;
  }

  static async updateCentre(id, body) {
    const header = {
      headers: {
        "X-JWT-Token": localStorage.getItem("token"),
      },
    };
    const response = await ApiService.put(API_ROUTES.CENTRE(id), body, header);
    return response.status;
  }

  static async getCentreByName(name) {
    const response = await ApiService.get(API_ROUTES.CENTRE_BY_NAME(name));
    const centre = new Centre(
      CentreSerializer.deSerializeCentre(response.data)
    );
    return centre;
  }

  static async getCentresByFilter(values) {
    const queryParams = addQueryParams(values)
    const response = await ApiService.get(API_ROUTES.CENTRE_BY_FILTER(queryParams))
    return response.data
  }
}

