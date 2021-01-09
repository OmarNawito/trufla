const httpStatus = require('http-status');
const {User} = require('../models');
const ApiError = require('../utils/ApiError');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const createUser = async (userBody) => {
    const user = await User.create(userBody);
    return user;
};

const queryUsers = async () => {
    const users = await User.findAll();
    return users;
  };
  

const getUserById = async (id) => {
    return User.findByPk(id);
};

const getUserByEmail = async (email) => {
    return User.findOne({where: {
            email
        }});
};

const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (! user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && await User.findOne({
        where: {
            email: req.body.email
        }
    })) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const deleteUserById = async (userId) => {
    const user = await getUserById(userId);
    if (! user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.remove();
    return user;
};
module.exports = {
    createUser,
    queryUsers,
    getUserByEmail,
    updateUserById,
    deleteUserById
}
