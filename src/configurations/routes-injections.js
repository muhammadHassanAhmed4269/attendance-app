const MongoRepository = require("../repositories/mongo");
const VerifyDeviceUseCase = require("../usecases/verifyDevice");
const VerifyEmailAddressCase = require("../usecases/verifyEmailAddress");
const CheckInAndOutUseCase = require("../usecases/checkInAndOut");
const EmailsGetter = require("../usecases/getEmails");
const Controller = require("../interfaces/controllers/controllers");
const setUpRoutes = require("../interfaces/routes/routes");

const mongoRepository = new MongoRepository();
const verifyDeviceUseCase = new VerifyDeviceUseCase(mongoRepository, "device");
const verifyEmailAddressUseCase = new VerifyEmailAddressCase(
  mongoRepository,
  "device",
  "employee"
);
const checkInAndOutUseCase = new CheckInAndOutUseCase(
  mongoRepository,
  "device",
  "employee",
  "shift",
  "attendance"
);
const getEmailsUseCase = new EmailsGetter(mongoRepository, "employee");

const controller = new Controller(
  verifyDeviceUseCase,
  verifyEmailAddressUseCase,
  checkInAndOutUseCase,
  getEmailsUseCase
);
const route = setUpRoutes(controller);

module.exports = route;
