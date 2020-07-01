const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: [true, "Email registered. Please use a new one"],
    },
    passwordHash: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);
module.exports = UserModel;
