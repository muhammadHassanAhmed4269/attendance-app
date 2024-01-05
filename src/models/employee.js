const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    fullName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    profilePicture: {
      type: String,
      trim: true,
    },
    mobileNumber: { type: String, trim: true, required: true },
    emergencyNumber: {
      type: String,
      trim: true,
      required: true,
    },
    nextToKin: {
      type: String,
      trim: true,
      required: true,
    },
    relationToKin: {
      type: String,
      trim: true,
      required: true,
    },
    homeAddress1: {
      type: String,
      trim: true,
      required: true,
    },
    homeAddress2: {
      type: String,
      trim: true,
      required: true,
    },
    nicNumber: { type: String, trim: true, required: true, unique: true },
    nicFrontPicture: {
      type: String,
      trim: true,
    },
    nicBackPicture: {
      type: String,
      trim: true,
    },
    cv: { type: String, trim: true },
    unit: [
      {
        type: Schema.Types.ObjectId,
        ref: "Unit",
        trim: true,
      },
    ],
    department: [
      {
        type: Schema.Types.ObjectId,
        ref: "Department",
        trim: true,
      },
    ],
    designation: [
      {
        type: Schema.Types.ObjectId,
        ref: "Designation",
        trim: true,
      },
    ],
    role: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
        trim: true,
      },
    ],
    shift: {
      type: Schema.Types.ObjectId,
      ref: "Shift",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.index({ email: 1 });

const Employee = model("Employee", schema);

module.exports = Employee;
