const { Schema, model } = require("mongoose");
const UserModel = require("../models/user.model");

const tripSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: [true, "Please enter a date"],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const TripModel = model("Trip", tripSchema);
module.exports = TripModel;
