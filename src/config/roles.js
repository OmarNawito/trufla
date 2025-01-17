const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getArticles', 'getArticle', 'createArticle', 'addComment', 'thumbsUp']);
roleRights.set(roles[1], ['getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};
