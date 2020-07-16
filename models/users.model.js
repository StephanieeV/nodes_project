const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  // id: Number,
  firstName: String,
  lastName: String,
  email: String
});

// UserSchema.method.fullName = function() {
//   return `${this.firstName} ${this.lastName}`;
// };

//module.exports = mongoose.model("User", UserSchema);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
