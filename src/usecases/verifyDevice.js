const { isNotFound } = require("entity-checker");
const { apiResponseHelper } = require("../configurations/utilities-injections");

class DeviceVerifier {
  constructor(repository, deviceModel) {
    this.repository = repository;
    this.deviceModel = deviceModel;
  }

  async verifyDevice(req, res) {
    try {
      const { deviceId } = req.body;

      const foundDevice = await this.repository.findOne(this.deviceModel, {
        deviceId,
      });

      const statusCode = isNotFound(foundDevice) ? 401 : 200;
      const message = isNotFound(foundDevice)
        ? "Unauthorized device"
        : "Device verified successfully";

      return apiResponseHelper(res, statusCode, message);
    } catch (error) {
      console.error(error);
      return apiResponseHelper(res, 500, "Something went wrong");
    }
  }
}

module.exports = DeviceVerifier;
