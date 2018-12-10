'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoConverter = require('../service/mongoConverter');
const applicationException = require('../service/applicationException');

const postSchema = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  image: {type: String},
}, {
  collection: 'post'
});
postSchema.plugin(uniqueValidator);

const PostModel = mongoose.model('post', postSchema);


async function query() {
  const result = await PostModel.find({});
  {
    if (result) {
      return mongoConverter(result);
    }
  }
}

async function get(id) {
  return PostModel.findOne({_id: id}).then(function (result) {
    if (result) {
      return mongoConverter(result);
    }
  });
}

async function createNewOrUpdate(data) {
  return Promise.resolve().then(() => {
    if (!data.id) {
      return new PostModel(data).save().then(result => {
        if (result[0]) {
          return mongoConverter(result[0]);
        }
      });
    } else {
      return PostModel.findOneAndUpdate({_id: data.id}, data);
    }
  }).catch(error => {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw applicationException.new(applicationException.BAD_REQUEST, error.message);
      console.log(error.message);
    }
    throw error;
  });
}


module.exports = {
  query: query,
  get: get,
  createNewOrUpdate: createNewOrUpdate,

  model: PostModel
};
