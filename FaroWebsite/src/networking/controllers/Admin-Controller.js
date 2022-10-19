import { API_ROUTES } from "../api-routes"
import { ApiService } from "../api-service"

export default class AdminController {
  static async handleLogin(user, password) {
    const body = {
      username: user,
      password: password,
    }
    const response = await ApiService.post(API_ROUTES.LOGIN(), body)
    return response.data
  }
}
