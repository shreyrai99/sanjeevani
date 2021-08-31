const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

//method to match password
userSchema.methods.matchPassword = async function(enteredPassword) {
  //enteredPassword is plain text, so we match encrypted string using bcrypt to see if password matches
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User = mongoose.model("User", userSchema);
