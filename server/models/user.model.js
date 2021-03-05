const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

userSchema.methods.toJSON = () => {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

module.exports = mongoose.model('User', userSchema);
