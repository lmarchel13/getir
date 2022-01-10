const HTTPStatusCode = {
  OK: 200,
  BadRequest: 400,
  NotFound: 404,
  InternalServerError: 500,
};

class CustomResponse {
  constructor(code, msg) {
    this.code = code;
    this.msg = msg;
    this.records = [];
  }
}

class BadRequestErrorResponse extends CustomResponse {
  constructor(msg = "bad request") {
    super(HTTPStatusCode.BadRequest, msg);
  }
}

class NotFoundErrorResponse extends CustomResponse {
  constructor(msg = "not found") {
    super(HTTPStatusCode.NotFound, msg);
  }
}

class InternalServerErrorResponse extends CustomResponse {
  constructor(msg = "internal server error") {
    super(HTTPStatusCode.InternalServerError, msg);
  }
}

class SuccessResponse extends CustomResponse {
  constructor(records = []) {
    super(0, "success");
    this.records = records;
  }
}

module.exports = {
  HTTPStatusCode,
  BadRequestErrorResponse,
  NotFoundErrorResponse,
  InternalServerErrorResponse,
  SuccessResponse,
};
