
const {User} = require('../models');

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
module.exports = {
    createUser,
    queryUsers,
    getUserById,
    getUserByEmail
}
