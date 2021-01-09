const { DataTypes } = require('sequelize');

const db = require('../config/database');

const Comment = db.define('Comment', {
    body: {
        type: DataTypes.STRING,
        allowNull: false
    },
    articleId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'articles',
            key: 'id'
        },
        allowNull: false
    }
}, {
    tableName: 'comments',
    timestamps: true
})


module.exports = Comment;