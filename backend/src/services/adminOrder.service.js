import { 
  findAllOrders, 
  findOrderById, 
  updateOrderById, 
  deleteOrderById,
  countOrders 
} from '../dao/adminOrder.dao.js';

export const getAllOrdersService = async ({ page, limit, status }) => {
  const skip = (page - 1) * limit;
  
  const filter = {};
  if (status) {
    filter.status = status;
  }
  
  const orders = await findAllOrders(filter, skip, limit);
  const totalOrders = await countOrders(filter);
  const totalPages = Math.ceil(totalOrders / limit);
  
  return {
    orders,
    currentPage: page,
    totalPages,
    totalOrders,
    limit
  };
};

export const getOrderByIdService = async (orderId) => {
  const order = await findOrderById(orderId);
  
  if (!order) {
    throw new Error("Order not found");
  }
  
  return order;
};

export const updateOrderStatusService = async (orderId, status) => {
  const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];
  
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid order status");
  }
  
  const order = await findOrderById(orderId);
  
  if (!order) {
    throw new Error("Order not found");
  }
  
  const updatedOrder = await updateOrderById(orderId, { status });
  
  return updatedOrder;
};

export const deleteOrderService = async (orderId) => {
  const order = await findOrderById(orderId);
  
  if (!order) {
    throw new Error("Order not found");
  }
  
  await deleteOrderById(orderId);
  
  return true;
};
