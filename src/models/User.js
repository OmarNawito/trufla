const { DataTypes } = require('sequelize');

const db = require('../config/database');
const bcrypt = require('bcrypt');
const { roles } = require('../config/roles');


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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 8
        }
    },
    job_title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM(roles),
        defaultValue: 'user'
    }
}, {
    tableName: 'users',
    timestamps: true,
    indexes: [{
        fields: ['email'],
        unique: true
    }],
})
User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10)
    .then(hash => {
        user.password = hash;
    })
    .catch(err => { 
        throw new Error(); 
    });   
})

User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = User;