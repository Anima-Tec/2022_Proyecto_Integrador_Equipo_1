import { Centre } from "../../models/Centre";
import { API_ROUTES } from "../api-routes";
import { ApiService } from "../api-service";
import { CentreSerializer } from "../serializers/centre-serializer";

export default class CentreController {
  static async getCentreCoordinates() {
    const config = {
      headers: {
        example: "",
      },
    };
    const response = await ApiService.get(API_ROUTES.CENTRES_COORDINATES());
    let centres = response.data.map(
      (centre) =>
        new Centre(CentreSerializer.deSerializeCentreCoordinates(centre))
    );
    return centres;
  }

  static async getCentresName() {
    const response = await ApiService.get(API_ROUTES.CENTRES_NAMES());
    let centres = response.data.map(
      (centre) =>
        new Centre(CentreSerializer.deSerializeCentreCoordinates(centre))
    );
    return centres;
  }

  static async getCentre(id) {
    const response = await ApiService.get(API_ROUTES.CENTRE(id));
    let centre = new Centre(CentreSerializer.deSerializeCentre(response.data));
    return centre;
  }

  static async getCentreByFuzzyName(name) {
    const response = await ApiService.get(API_ROUTES.FUZZY_CENTRE(name));
    let centres = response.data.map(
      (centre) =>
        new Centre(CentreSerializer.deSerializeCentreCoordinates(centre))
    );
    return centres;
  }
}
