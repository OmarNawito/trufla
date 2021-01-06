const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const sequelize = require('sequelize')
const Op = sequelize.Op;

router.get('/', (req, res) => {
    Article.findAll().then(articles => res.send(articles)).catch(err => console.log(err))
})

router.post('/add', (req, res) => {
    const data = {
        title: 'eshta',
        body: 'eeeeeeeeeeeermkvmkvnkcvkcvn',
        author: 'omar nawito'
    }
    Article.create(data).then(article => res.send(article)).catch(err => console.log(err));
});

router.get('/search', (req, res) => {
    let { term } = req.query;

    term = term.toLowerCase();

    Article.findAll({ where: { title: { [Op.like]: '%' + term + '%' } } }).then(articles => res.send(articles)).catch(err => console.log(err))
})

module.exports = router;