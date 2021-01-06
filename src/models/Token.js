const { DataTypes } = require('sequelize');

const db = require('../config/database');
const { tokenTypes } = require('../config/tokens');


const Token = db.define('Token', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM(tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD),
        allowNull: false,
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: false
    },
    blacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'tokens',
    timestamps: true,
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

module.exports = Token;