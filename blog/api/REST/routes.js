'use strict';
const postEndpoint = require('./post.endpoint');
const routes = (router, config) => {
  postEndpoint (router);
};
// export default routes;

module.exports = routes;
