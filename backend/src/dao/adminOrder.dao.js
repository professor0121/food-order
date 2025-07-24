import Order from '../models/order.model.js';

export const findAllOrders = async (filter = {}, skip = 0, limit = 10) => {
  return await Order.find(filter)
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const findOrderById = async (orderId) => {
  return await Order.findById(orderId)
    .populate('user', 'name email');
};

export const updateOrderById = async (orderId, updateData) => {
  return await Order.findByIdAndUpdate(
    orderId, 
    updateData, 
    { new: true, runValidators: true }
  ).populate('user', 'name email');
};

export const deleteOrderById = async (orderId) => {
  return await Order.findByIdAndDelete(orderId);
};

export const countOrders = async (filter = {}) => {
  return await Order.countDocuments(filter);
};
