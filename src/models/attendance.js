const { Schema, model } = require("mongoose");

const statuses = ["Checked In", "Checked Out"];
const checkInStatuses = ["On Time", "Late", "Leave", "Pending", "Early"];
const checkOutStatuses = ["On Time", "Overtime", "Leave", "Pending", "Early"];
const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Pending",
];

const attendanceSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: statuses,
      trim: true,
    },
    attendances: [
      {
        checkInDate: {
          type: String,
          trim: true,
        },
        checkInDay: {
          type: String,
          trim: true,
          enum: Days,
        },
        checkInTime: {
          type: String,
          trim: true,
        },
        checkInStatus: {
          type: String,
          enum: checkInStatuses,
          trim: true,
          default: "Pending",
        },
        checkOutDate: {
          type: String,
          trim: true,
          default: "dd-mm-yyyy",
        },
        checkOutDay: {
          type: String,
          trim: true,
          enum: Days,
          default: "Pending",
        },
        checkOutTime: {
          type: String,
          trim: true,
          default: "00:00 AM/PM",
        },
        checkOutStatus: {
          type: String,
          enum: checkOutStatuses,
          trim: true,
          default: "Pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Attendance = model("Attendance", attendanceSchema);

module.exports = Attendance;
