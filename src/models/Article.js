const { DataTypes } = require('sequelize');

const db = require('../config/database');

const Article = db.define('Article', {

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'articles',
    timestamps: true
})

module.exports = Article;