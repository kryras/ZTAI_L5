'use strict';

const _ = require('lodash');

function convert(data) {
  if (Array.isArray(data)) {
    return _.map(data, function (elem) {
      return convert(elem);
    });
  }
  data = data.toObject({getters: true, versionKey: false});
  delete data._id;
  return data;
}

module.exports = convert;
