import * as userDAO from '../dao/user.dao.js';

export const getUsersService = async ({ page, limit, role }) => {
  const query = role === 'all' ? {} : { role };
  return await userDAO.findUsers(query, page, limit);
};

export const getUserByIdService = async (userId) => {
  return await userDAO.findUserById(userId);
};

export const createUserService = async (userData) => {
  return await userDAO.insertUser(userData);
};

export const updateUserService = async (userId, data) => {
  return await userDAO.updateUserById(userId, data);
};

export const deleteUserService = async (userId) => {
  return await userDAO.deleteUserById(userId);
};

export const updateUserStatusService = async (userId, status) => {
  return await userDAO.updateUserStatusById(userId, status);
};
    