const { Schema, model } = require("mongoose");
const TripModel = require("../models/trip.model");

const StopSchema = new Schema(
  {
    location: {
      type: String,
      required: [true, "Please enter a location"],
    },
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
    image: {
      type: String,
    },
    trip_id: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
    },
  },
  {
    timestamps: true,
  }
);

const StopModel = model("Stop", StopSchema);
module.exports = StopModel;
