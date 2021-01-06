const { DataTypes } = require('sequelize');

const db = require('../config/database');
// const Sequelize = require('sequelize')
// const Op = Sequelize.Op;


const User = db.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Must be a valid email address",
            }
        }
    },
    job_title: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: true,
    indexes: [{
        fields: ['email'],
        unique: true
    }]
})

// User.prototype.isEmailTaken = async function (email, excludeUserId) {
//     const user = await this.findOne({
//         where: {
//             email,
//             id: { [Op.ne]: excludeUserId }
//         }
//     });
//     return !!user;
// };

module.exports = User;