const { body, validationResult } = require("express-validator");

const handleValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

const verifyDevice = [
  body("deviceId").notEmpty().withMessage("Device ID is required"),
  body("deviceId").isString().withMessage("Invalid device ID"),
];

const verifyEmailAddress = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("deviceId")
    .notEmpty()
    .withMessage("Device ID is required")
    .isString()
    .withMessage("Invalid device ID"),
];

module.exports = { verifyDevice, verifyEmailAddress, handleValidationResult };
