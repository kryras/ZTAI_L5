'use strict';
const mongoose = require('mongoose');
const config = require('../config');
const momentWrapper = require('../service/momentWrapper');
const jwt = require('jsonwebtoken');
const mongoConverter = require('../service/mongoConverter');
const applicationException = require('../service/applicationException');

const tokenTypeEnum = {
  authorization: 'authorization'
};

const tokenTypes = [tokenTypeEnum.authorization];

const tokenSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  createDate: {type: Number, required: true},
  type: {type: String, enum: tokenTypes, required: true},
  value: {type: String, required: true}
}, {
  collection: 'token'
});

const TokenModel = mongoose.model('token', tokenSchema);

async function create(user) {
  const access = 'auth';
  const userData = {
    userId: user.id,
    name: user.email,
    role: user.role,
    access: access
  };
  const value = jwt.sign(
    userData,
    config.JwtSecret,
    {
      expiresIn: '1h'
    });
  const result = await TokenModel({
    userId: user.id,
    type: 'authorization',
    value: value,
    createDate: momentWrapper.get().valueOf()
  }).save();
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.BAD_REQUEST, error.message);
}

async function get(tokenValue) {
  const result = await TokenModel.findOne({value: tokenValue});
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.UNAUTHORIZED, 'Token not found');
}

async function remove(userId) {
  return await TokenModel.remove({userId: userId});
}

module.exports = {
  create: create,
  get: get,
  remove: remove,

  tokenTypeEnum: tokenTypeEnum,
  model: TokenModel
};
