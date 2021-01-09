const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller')
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const articleValidation = require('../validations/article.validation');


router.get('/', auth('getArticles'), validate(articleValidation.getFilter), articleController.getAllArticles);
router.get('/:articleId', auth('getArticle'), articleController.getArticle);
router.post('/',auth('createArticle'), validate(articleValidation.createArticle), articleController.createArticle);
router.post('/comment',auth('addComment'), validate(articleValidation.addComment), articleController.addComment);
router.post('/thumbs-up', auth('thumbsUp'), articleController.addThumbUp);

module.exports = router;