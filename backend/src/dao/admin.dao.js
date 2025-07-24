import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";

export const findAdminByEmail = async (email) => {
  return await Admin.findOne({ email });
};

export const createAdmin = async (adminData) => {
  const admin = new Admin(adminData);
  return await admin.save();
};

export const getAllUsers = async () => {
  return await User.find();
}