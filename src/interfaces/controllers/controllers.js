class Controller {
  constructor(
    verifyDeviceUseCase,
    verifyEmailAddressUseCase,
    checkInAndOutUseCase,
    getEmailsUseCase
  ) {
    this.verifyDeviceUseCase = verifyDeviceUseCase;
    this.verifyEmailAddressUseCase = verifyEmailAddressUseCase;
    this.checkInAndOutUseCase = checkInAndOutUseCase;
    this.getEmailsUseCase = getEmailsUseCase;
  }

  async verifyDeviceController(req, res) {
    try {
      return await this.verifyDeviceUseCase.verifyDevice(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async verifyEmailAddressController(req, res) {
    try {
      return await this.verifyEmailAddressUseCase.verifyEmailAddress(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async checkInAndOutController(req, res) {
    try {
      return await this.checkInAndOutUseCase.checkInAndOut(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getEmailsController(req, res) {
    try {
      return await this.getEmailsUseCase.getEmails(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
