const { isNotFound } = require("entity-checker");
const {
  apiResponseHelper,
  nodeMailerHelper,
} = require("../configurations/utilities-injections");

class AttendanceManager {
  constructor(
    repository,
    deviceModel,
    employeeModel,
    shiftModel,
    attendanceModel
  ) {
    this.repository = repository;
    this.deviceModel = deviceModel;
    this.employeeModel = employeeModel;
    this.shiftModel = shiftModel;
    this.attendanceModel = attendanceModel;
  }

  async checkInAndOut(req, res) {
    try {
      const { deviceId } = req.body;

      const getDevice = await this.repository.findOne(this.deviceModel, {
        deviceId,
      });

      if (isNotFound(getDevice)) {
        return apiResponseHelper(res, 404, "Unknown device found");
      }

      const getEmployee = await this.getUserByDeviceId(getDevice.owner);

      if (isNotFound(getEmployee)) {
        return apiResponseHelper(res, 400, "Bad request");
      }

      const getShift = await this.repository.findOne(this.shiftModel, {
        _id: getEmployee.shift,
      });

      if (isNotFound(getShift)) {
        return apiResponseHelper(res, 400, "Bad request");
      }

      const getAttendance = await this.repository.findOne(
        this.attendanceModel,
        { employee: getEmployee._id }
      );

      if (isNotFound(getAttendance)) {
        await this.createCheckInAttendance(
          getEmployee._id,
          getShift.timings.start
        );
        return apiResponseHelper(res, 201, "Checked in successfully");
      }

      if (getAttendance.status === "Checked In") {
        await this.updateCheckOutAttendance(
          getAttendance,
          getShift.timings.end
        );
        return apiResponseHelper(res, 200, "Checked out successfully");
      }

      await this.addNewCheckIn(getAttendance, getShift.timings.start);
      return apiResponseHelper(res, 200, "Checked in successfully");
    } catch (error) {
      console.error(error);
      return apiResponseHelper(res, 500, "Something went wrong");
    }
  }

  async getUserByDeviceId(employee) {
    return await this.repository.findOne(this.employeeModel, { _id: employee });
  }

  async createCheckInAttendance(employee, startTime) {
    const checkInTime = this.formatTimeFromTimestamp(
      new Date(Date.now()).getTime()
    );
    const checkInFormData = {
      employee,
      status: "Checked In",
      attendances: [
        {
          checkInDate: this.getCurrentDate(),
          checkInDay: this.getCurrentDay(),
          checkInTime,
          checkInStatus: this.checkTimeIn(startTime, checkInTime),
        },
      ],
    };
    await this.repository.create(this.attendanceModel, checkInFormData);
  }

  async updateCheckOutAttendance(attendance, endTime) {
    const checkOutTime = this.formatTimeFromTimestamp(
      new Date(Date.now()).getTime()
    );

    const checkOutFormData = {
      status: "Checked Out",
      attendance: {
        checkOutDate: this.getCurrentDate(),
        checkOutDay: this.getCurrentDay(),
        checkOutTime,
        checkOutStatus: this.checkTimeOut(endTime, checkOutTime),
      },
    };
    attendance.status = checkOutFormData.status;
    attendance.attendances.forEach((attendanceItem) => {
      if (attendanceItem.checkOutTime === "00:00 AM/PM") {
        attendanceItem.checkOutDate = checkOutFormData.attendance.checkOutDate;
        attendanceItem.checkOutDay = checkOutFormData.attendance.checkOutDay;
        attendanceItem.checkOutTime = checkOutFormData.attendance.checkOutTime;
        attendanceItem.checkOutStatus =
          checkOutFormData.attendance.checkOutStatus;
      }
    });
    await attendance.save();
  }

  async addNewCheckIn(attendance, startTime) {
    const checkInTime = this.formatTimeFromTimestamp(
      new Date(Date.now()).getTime()
    );
    const checkInFormData = {
      checkInDate: this.getCurrentDate(),
      checkInDay: this.getCurrentDay(),
      checkInTime,
      checkInStatus: this.checkTimeIn(startTime, checkInTime),
    };
    attendance.attendances.push(checkInFormData);
    attendance.status = "Checked In";
    await attendance.save();
  }

  // Other helper methods remain the same as in the initial code snippet

  getCurrentDate() {
    try {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.toLocaleString("default", { month: "long" });
      const year = currentDate.getFullYear();

      const formattedDate = `${day}-${month}-${year}`;
      return formattedDate;
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentDay() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const today = new Date().getDay();
    const currentDay = days[today];

    return currentDay;
  }

  formatTimeFromTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  extractTimeComponents(time) {
    const [hourMinute, ampm] = time.split(" ");
    const [hour, minute] = hourMinute.split(":");
    return [parseInt(hour), parseInt(minute), ampm];
  }

  calculateTimeDifference(hour1, minute1, ampm1, hour2, minute2, ampm2) {
    let time1 = hour1 * 60 + minute1;
    let time2 = hour2 * 60 + minute2;

    if (ampm1 !== ampm2 && ampm1 === "AM" && ampm2 === "PM") {
      time2 += 12 * 60;
    } else if (ampm1 !== ampm2 && ampm1 === "PM" && ampm2 === "AM") {
      time1 += 12 * 60;
    }

    return time2 - time1;
  }

  checkTimeIn(startTime, timeIn) {
    const [startHour, startMinute, startAMPM] =
      this.extractTimeComponents(startTime);
    const [timeInHour, timeInMinute, timeInAMPM] =
      this.extractTimeComponents(timeIn);

    const minutesDifference = this.calculateTimeDifference(
      startHour,
      startMinute,
      startAMPM,
      timeInHour,
      timeInMinute,
      timeInAMPM
    );

    if (minutesDifference > 30) {
      return "Late";
    } else if (minutesDifference < -30) {
      return "Early";
    } else if (minutesDifference >= -30 && minutesDifference <= 30) {
      return "On Time";
    } else {
      return "Leave";
    }
  }

  checkTimeOut(endTime, timeOut) {
    const [endHour, endMinute, endAMPM] = this.extractTimeComponents(endTime);
    const [timeOutHour, timeOutMinute, timeOutAMPM] =
      this.extractTimeComponents(timeOut);

    const minutesDifference = this.calculateTimeDifference(
      endHour,
      endMinute,
      endAMPM,
      timeOutHour,
      timeOutMinute,
      timeOutAMPM
    );

    const THIRTY_MINUTES = 30;

    if (minutesDifference > THIRTY_MINUTES) {
      return "Overtime";
    } else if (minutesDifference < -THIRTY_MINUTES) {
      return "Early";
    } else {
      return "On Time";
    }
  }

  async sendEmailHelper(email, deviceId) {
    try {
      const emailData = {
        serviceType: process.env.SERVICE_TYPE,
        authUser: process.env.AUTH_USER,
        authPass: process.env.AUTH_PASS,
        to: email,
        subject: "Updated Device ID",
        html: `<p>This is you device ID <b>${deviceId}</b>. Please don't share it with anyone except Administrator.</p>`,
      };
      await nodeMailerHelper(emailData);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AttendanceManager;
