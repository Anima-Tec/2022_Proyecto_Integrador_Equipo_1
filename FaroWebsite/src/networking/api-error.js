const ERROR_CODES = {
  GENERIC_ERROR: "genericError",
};

const ERROR_STATUSES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  PRECONDITION_FAILED: 412,
  SERVER_ERROR: 500,
};

class ApiError extends Error {
  constructor(params) {
    super(params.message);
    this.status = params.status;
    this.code = params.code;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export { ApiError, ERROR_CODES, ERROR_STATUSES };
