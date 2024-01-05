const {
  apiResponseHelper,
} = require("../../configurations/utilities-injections");

class VerifyConnectionMiddleware {
  checkWifiMiddleware(req, res, next) {
    try {
      const macAddress = req.body.macAddress;

      if (macAddress === process.env.MAC_ADDRESS) {
        return next();
      } else {
        return apiResponseHelper(res, 401, "Unauthorized network");
      }
    } catch (error) {
      console.error(error);
      return apiResponseHelper(res, 500, "Something went wrong");
    }
  }
}

module.exports = VerifyConnectionMiddleware;
