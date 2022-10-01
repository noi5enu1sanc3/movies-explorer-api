const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../helpers/errors/UnauthorizedError');
const { wrongEmailOrPasswordMessage } = require('../helpers/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Non-valid email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

userSchema
  .methods
  .toJSON = function hidePassword() {
    const user = this.toObject();
    delete user.password;
    return user;
  };

userSchema
  .statics
  .findUserByCredentials = async function findUserByCredentials(email, password, next) {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
      return next(new UnauthorizedError(wrongEmailOrPasswordMessage));
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return next(new UnauthorizedError(wrongEmailOrPasswordMessage));
    }
    return user;
  };

module.exports = mongoose.model('user', userSchema);
