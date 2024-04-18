const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SuperAdmin = mongoose.model("superadmin", superAdminSchema);

module.exports = SuperAdmin;
