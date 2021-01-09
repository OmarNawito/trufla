const { DataTypes } = require('sequelize');

const db = require('../config/database');
const User = require('./User');

const Like = db.define('Like', {
    articleId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'articles',
            key: 'id'
        },
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
    tableName: 'likes',
    timestamps: true
})

// Like.belongsTo(Article, {foreignKey: 'articleId'})
Like.belongsTo(User, {foreignKey: 'userId'})


module.exports = Like;