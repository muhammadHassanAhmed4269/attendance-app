const { isNotFound } = require("entity-checker");
const { apiResponseHelper } = require("../configurations/utilities-injections");

class EmailsGetter {
  constructor(repository, employeeModel) {
    this.repository = repository;
    this.employeeModel = employeeModel;
  }

  async getEmails(req, res) {
    try {
      const employeeEmails = await this.repository.find(this.employeeModel);
      console.log({ employeeEmails });
      if (isNotFound(employeeEmails)) {
        return apiResponseHelper(res, 404, "No email found");
      } else {
        const emails = [];
        employeeEmails.map((u) => {
          emails.push({
            _id: u._id,
            email: u.email,
          });
        });
        return apiResponseHelper(res, 200, "Emails found successfully", emails);
      }
    } catch (error) {
      console.error(error);
      return apiResponseHelper(res, 500, "Something went wrong");
    }
  }
}

module.exports = EmailsGetter;
