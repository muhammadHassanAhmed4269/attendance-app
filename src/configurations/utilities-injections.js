const APIResponse = require("../utilities/response");
const NodeMailer = require("../utilities/nodemailer");

const apiResponseHelper = (res, status, message, data) => {
  const apiResponse = new APIResponse(res);
  return apiResponse.sendResponse(status, message, data);
};

const nodeMailerHelper = async (emailData) => {
  const nodemailer = new NodeMailer(
    emailData.serviceType,
    emailData.authUser,
    emailData.authPass,
    emailData.to,
    emailData.subject,
    emailData.html
  );

  return await nodemailer.sendEmail();
};

module.exports = { apiResponseHelper, nodeMailerHelper };
