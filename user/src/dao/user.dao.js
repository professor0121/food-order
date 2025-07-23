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