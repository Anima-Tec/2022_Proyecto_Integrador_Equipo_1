/* eslint-disable no-underscore-dangle */
import axios from "axios";

import { constants } from "../config/constants";
import { ApiError } from "./api-error";

const METHODS = {
  delete: "delete",
  get: "get",
  patch: "patch",
  post: "post",
  put: "put",
};

class ApiServiceClass {
  constructor() {
    this.axios = axios.create({
      baseURL: constants.apiBaseURL,
    });
    this._addedHeaders = {};
  }

  async _sendRequest(method, url, config = {}) {
    try {
      const updatedConfig = { ...config };
      updatedConfig.headers = {
        ...this._addedHeaders,
        ...(config.headers || {}),
      };
      if (method === METHODS.get || method === METHODS.delete) {
        return await this.axios[method](url, updatedConfig);
      }
      const body = updatedConfig.body || {};
      delete updatedConfig.body;
      return await this.axios[method](url, body, updatedConfig);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        console.log(error);
      }
      throw new ApiError({
        status: null,
        code: null,
        message: error.message,
      });
    }
  }

  setHeaders(newHeaders) {
    Object.assign(this._addedHeaders, newHeaders);
  }

  get(url, params = {}, config = {}) {
    return this._sendRequest(METHODS.get, url, { ...config, params });
  }

  post(url, body = {}, config = {}) {
    return this._sendRequest(METHODS.post, url, { ...config, body });
  }

  patch(url, body = {}, config = {}) {
    return this._sendRequest(METHODS.patch, url, { ...config, body });
  }

  put(url, body = {}, config = {}) {
    return this._sendRequest(METHODS.put, url, { ...config, body });
  }

  delete(url, params = {}, config = {}) {
    return this._sendRequest(METHODS.delete, url, { ...config, params });
  }
}

const ApiService = new ApiServiceClass();

export { ApiService };
