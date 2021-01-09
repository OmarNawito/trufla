const {DataTypes} = require('sequelize');

const db = require('../config/database');
const User = require('./User');
const Comment = require('./Comment');
const Like  = require('./Like');

const Article = db.define('Article', {

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false
    }
}, {
    tableName: 'articles',
    timestamps: true
})

Article.belongsTo(User, {
    as:'author',
    foreignKey: 'userId',
});

Article.hasMany(Comment, {
    as: 'comments',
    foreignKey: 'articleId',
})

Article.hasMany(Like, {
    as: 'likes',
    foreignKey: 'articleId'
})

module.exports = Article;
