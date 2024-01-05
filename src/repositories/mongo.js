const Device = require("../models/device");
const Employee = require("../models/employee");
const Attendance = require("../models/attendance");
const Shift = require("../models/shifts");

class Mongo {
  async find(reference, filteredQuery = null) {
    try {
      return this.getModel(reference).find(filteredQuery);
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(reference, filteredQuery) {
    try {
      return this.getModel(reference).findOne(filteredQuery);
    } catch (error) {
      console.error(error);
    }
  }

  async create(reference, formData) {
    try {
      return this.getModel(reference).create(formData);
    } catch (error) {
      console.error(error);
    }
  }

  async findOneAndUpdate(reference, filteredQuery, formData, flag) {
    try {
      return this.getModel(reference).findOneAndUpdate(
        filteredQuery,
        formData,
        flag
      );
    } catch (error) {
      console.error(error);
    }
  }

  async findOneAndDelete(reference, filteredQuery) {
    try {
      return this.getModel(reference).findOneAndDelete(filteredQuery);
    } catch (error) {
      console.error(error);
    }
  }

  getModel(model) {
    if (model === "device") {
      return (this.model = Device);
    } else if (model === "employee") {
      return (this.model = Employee);
    } else if (model === "shift") {
      return (this.model = Shift);
    } else if (model === "attendance") {
      return (this.model = Attendance);
    } else {
      return "Invalid model";
    }
  }
}

module.exports = Mongo;
