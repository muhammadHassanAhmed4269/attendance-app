const {
  verifyDevice,
  handleValidationResult,
  verifyEmailAddress,
} = require("../middlewares/check-validation");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.post(
      "/api/v1/auth/device/verify",
      verifyDevice,
      handleValidationResult,
      controller.verifyDeviceController.bind(controller)
    );

    router.post(
      "/api/v1/auth/email/verify",
      verifyEmailAddress,
      handleValidationResult,
      controller.verifyEmailAddressController.bind(controller)
    );

    router.post(
      "/api/v1/auth/user/check",
      verifyDevice,
      handleValidationResult,
      controller.checkInAndOutController.bind(controller)
    );

    router.get(
      "/api/v1/auth/user/emails",
      controller.getEmailsController.bind(controller)
    );

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
