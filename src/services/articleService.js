const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Article = require('../models/Article')
const User = require('../models/User')
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const  Sequelize  = require('sequelize');
const Op = Sequelize.Op;


const getAllArticles = async (articleFilter) => {
    let filter = {};
    if(articleFilter.title) {
        filter.title = {
            [Op.like]: `%${articleFilter.title}%`
        }
    }
    else if (articleFilter.body) {
        filter.body = {
            [Op.like]: `%${articleFilter.body}%`
        }
    }
    else {
        filter = {}
    }
    const articles = await Article.findAll({
        where: filter,
        include: [
            {
                model: User,
                as: 'author',
                attributes: ['firstName', 'lastName', 'job_title']
            }, {
                model: Comment,
                as: 'comments'
            }, {
                model: Like,
                as: 'likes'
            }
        ],
        order: [
            [
                {
                    model: Like,
                    as: 'likes'
                },
                'id',
                'DESC'
            ]
        ]
    })
    return articles
};

const getArticle = async (articleId) => {
    const article = await Article.findByPk(articleId, {
        include: [
            {
                model: User,
                as: 'author',
                attributes: ['firstName', 'lastName', 'job_title']
            }, {
                model: Comment,
                as: 'comments'
            }
        ]
    });

    if (! article) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
    }
    return article
}

const createArticle = async (articleBody) => {
    const article = await Article.create(articleBody);
    return article
}

const addComment = async (commentBody) => {
    const comment = await Comment.create(commentBody);
    return comment
}

const thumbUp = async (thumbsUpBody) => {

    const article = await Article.findByPk(thumbsUpBody.articleId)
    if(!article) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Article not found');
    }
    const thumbsUp = await Like.findOrCreate({
        where: {
            userId: thumbsUpBody.userId,
            articleId : thumbsUpBody.articleId
        },
        defaults: {
            userId: thumbsUpBody.userId,
            articleId: thumbsUpBody.articleId
        }
    });
    return thumbsUp;
}

module.exports = {
    getAllArticles,
    getArticle,
    createArticle,
    addComment,
    thumbUp
}
