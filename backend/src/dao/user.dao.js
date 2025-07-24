import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};  

export const createUser = async (user) => {
  return await User.create(user);
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const updateUser = async (id, user) => {
  return await User.findByIdAndUpdate(id, user, { new: true });
};

export const findUsers = async (query, page, limit) => {
  const users = await User.find(query)
    .skip((page - 1) * limit)
    .limit(limit);
  const count = await User.countDocuments(query);
  return { users, total: count };
};

export const insertUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

export const updateUserById = async (userId, data) => {
  return await User.findByIdAndUpdate(userId, data, { new: true });
};

export const deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

export const updateUserStatusById = async (userId, status) => {
  return await User.findByIdAndUpdate(userId, { status }, { new: true });
};
