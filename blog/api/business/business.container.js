'use strict';

const postManager = require('./post.manager');
const userManager = require('./user.manager');

function getContext(request) {
  return {user: request && request.user};
}

function getter(manager, request) {
  return function () {
    return manager.create(getContext(request), this);
  };
}

const createBusinessContainer = (request, config) => {
  return {
    getPostManager: getter(postManager, request),
    getUserManager: getter(userManager, request)
  };
};

module.exports = createBusinessContainer;
