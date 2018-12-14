'use strict';
const business = require('../business/business.container');
const applicationException = require('../service/applicationException');
const auth = require('../middleware/auth');

const userEndpoint = (router) => {
  router.post('/api/user/auth', async (request, response, next) => {
    try {
      console.log(request.body);
      let result = await business(request).getUserManager(request).authenticate(request.body.login, request.body.password);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.post('/api/user/create', async (request, response, next) => {
    try {
      let result = await business(request).getUserManager(request).createNewOrUpdate(request.body);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.delete('/api/user/logout/:userId', auth, async (request, response, next) => {
    try {
      let result = await business(request).getUserManager(request).removeHashSession(request.body.userId);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
};

module.exports = userEndpoint;
