'use strict';
const PasswordDAO = require('../DAO/passwordDAO');
const TokenDAO = require('../DAO/tokenDAO');
const UserDAO = require('../DAO/userDAO');
const applicationException = require('../service/applicationException');
const sha1 = require('sha1');

function create(context) {

  function hashString(password) {
    return sha1(password);
  }

  async function authenticate(name, password) {
    console.log(name, password);
    let userData;
    const user = await UserDAO.getByEmailOrName(name);
    if (!user) {
      throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
    }
    if (!user.active) {
      throw applicationException.new(applicationException.NOT_FOUND, 'User does not exist or does not active');
    }
    userData = await user;
    await PasswordDAO.authorize(user.id, hashString(password));
    const token = await TokenDAO.create(userData);
    return getToken(token);
  }

  function getToken(token) {
    return {token: token.value};
  }

  async function getUserByToken(receivedToken) {
    const token = await TokenDAO.get(receivedToken);
    return await UserDAO.get(token.userId);
  }

  async function createNewOrUpdate(userData) {
    const user = await UserDAO.createNewOrUpdate(userData);
    if (await userData.password) {
      return await PasswordDAO.createOrUpdate({userId: user.id, password: hashString(userData.password)});
    } else {
      return user;
    }
  }

  async function removeUserById(id) {
    return await UserDAO.removeById(id);
  }

  async function removeHashSession(userId) {
    return await TokenDAO.remove(userId);
  }

  return {
    authenticate: authenticate,
    getUserByToken: getUserByToken,
    createNewOrUpdate: createNewOrUpdate,
    removeUserById: removeUserById,
    removeHashSession: removeHashSession
  };
}

module.exports = {
  create: create
};
