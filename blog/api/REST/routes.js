'use strict';
const postEndpoint = require('./post.endpoint');
const routes = (router, config) => {
  postEndpoint(router);
};

module.exports = routes;
