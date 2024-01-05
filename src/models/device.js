const { Schema, model } = require("mongoose");

const deviceSchema = new Schema({
  deviceId: { type: String, trim: true, required: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    trim: true,
    required: true,
  },
});

const Device = model("Device", deviceSchema);

module.exports = Device;
