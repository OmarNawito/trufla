const Joi = require('joi');

const createArticle = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
  }),
};

const addComment = {
    body: Joi.object().keys({
        body: Joi.string().required(),
      })
}


const getFilter = {
  query: Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
  }),
};

module.exports = {
    createArticle,
    addComment,
    getFilter
};
