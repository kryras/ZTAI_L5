'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoConverter = require('../service/mongoConverter');
const _ = require("lodash");
const applicationException = require("../service/applicationException");

const userRole = {
  admin: 'admin',
  user: 'user'
};

const userRoles = [userRole.admin, userRole.user];

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  role: {type: String, enum: userRoles, default: userRoles.user, required: false},
  active: {type: Boolean, default: true, required: false},
  isAdmin: {type: Boolean, default: false, required: false},
}, {
  collection: 'user'
});
userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('user', userSchema);

function createNewOrUpdate(user) {
  return Promise.resolve().then(() => {
    if (!user.id) {
      return new UserModel(user).save().then(result => {
        if (result) {
          return mongoConverter(result);
        }
      });
    } else {
      return UserModel.findOneAndUpdate(user.id, _.omit(user, 'id'), {new: true});
    }
  }).catch(error => {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw applicationException.new(applicationException.BAD_REQUEST, error.message);
    }
    throw error;
  });
}

async function getByEmailOrName(name) {
  const result = await UserModel.findOne(
    {
      $or: [
        {email: name}, {name: name}
      ]
    });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function get(id) {
  const result = await UserModel.findOne({_id: id});
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function removeById(id) {
  return await UserModel.findOneAndRemove(id);
}

module.exports = {
  createNewOrUpdate: createNewOrUpdate,
  getByEmailOrName: getByEmailOrName,
  get: get,
  removeById: removeById,

  userRole: userRole,
  model: UserModel
};
