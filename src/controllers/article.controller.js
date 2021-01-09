const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {articleService} = require('../services');
const pick = require('../utils/pick')

const getAllArticles = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['title', 'body']);
    const articles = await articleService.getAllArticles(filter);
    res.status(httpStatus.OK).send({articles});
});

const getArticle = catchAsync(async (req,res) => {
    const article = await articleService.getArticle(req.params.articleId);
    res.status(httpStatus.OK).send({article});
})

const createArticle = catchAsync(async (req,res) => {
    req.body.userId = req.user.id;
    const article = await articleService.createArticle(req.body);
    res.status(httpStatus.CREATED).send(article);
})

const addComment = catchAsync(async (req, res) => {
    const comment = await articleService.addComment(req.body);
    res.status(httpStatus.OK).send(comment);
})

const addThumbUp = catchAsync(async (req, res) => {
    req.body.userId = req.user.id;
    await articleService.thumbUp(req.body);
    res.status(httpStatus.OK).json({message: 'thumbs up successfully'})
})

module.exports = {
    getAllArticles,
    getArticle,
    createArticle,
    addComment,
    addThumbUp
}
