const VerifyConnectionMiddleware = require("../interfaces/middlewares/check-ssid");
const { apiResponseHelper } = require("./utilities-injections");

const verifyConnectionMiddleware = (req, res, next) => {
  try {
    const middleware = new VerifyConnectionMiddleware();
    return middleware.checkWifiMiddleware(req, res, next);
  } catch (error) {
    console.error(error);
    return apiResponseHelper(res, 500, "Something went wrong");
  }
};

module.exports = { verifyConnectionMiddleware };
