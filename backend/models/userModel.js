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

userSchema.pre("save", async function(next) {
  //encrypt password from text into hashed before saving while registering user
  //generate new hash only at time of registry or modification of password
  // dont want to re-hash if we update name or email as then password is rehashed and we wont be login
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = User = mongoose.model("User", userSchema);
