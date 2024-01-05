const { isNotFound } = require("entity-checker");
const { apiResponseHelper } = require("../configurations/utilities-injections");

class EmailVerifier {
  constructor(repository, deviceModel, employeeModel) {
    this.repository = repository;
    this.deviceModel = deviceModel;
    this.employeeModel = employeeModel;
  }

  async verifyEmailAddress(req, res) {
    try {
      const { email, deviceId } = req.body;

      const foundEmployee = await this.repository.findOne(this.employeeModel, {
        email,
      });

      if (isNotFound(foundEmployee)) {
        return apiResponseHelper(res, 404, "Invalid email");
      }

      const foundDevice = await this.repository.findOne(this.deviceModel, {
        owner: foundEmployee._id,
      });

      if (isNotFound(foundDevice)) {
        await this.repository.create(this.deviceModel, {
          deviceId,
          owner: foundEmployee._id,
        });
        return apiResponseHelper(res, 200, "Email verified successfully");
      }

      if (foundDevice.deviceId !== deviceId) {
        return apiResponseHelper(res, 404, "Unknown device found");
      }

      return apiResponseHelper(res, 200, "Email verified successfully");
    } catch (error) {
      console.error(error);
      return apiResponseHelper(res, 500, "Something went wrong");
    }
  }
}

module.exports = EmailVerifier;
