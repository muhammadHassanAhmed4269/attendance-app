class APIResponse {
  constructor(res) {
    this.res = res;
  }

  sendResponse(status, message, data) {
    return this.res.status(status).json({
      header: { status, message },
      body: data,
    });
  }
}

module.exports = APIResponse;
