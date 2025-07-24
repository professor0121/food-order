import asyncHandler from "../utils/asyncHandler.js";
import { 
  getAllOrdersService, 
  getOrderByIdService, 
  updateOrderStatusService, 
  deleteOrderService 
} from '../services/adminOrder.service.js';

export const getAllOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status = 'all' } = req.query;
  
  const result = await getAllOrdersService({
    page: parseInt(page),
    limit: parseInt(limit),
    status: status === 'all' ? null : status
  });

  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    orders: result.orders,
    pagination: {
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      totalOrders: result.totalOrders,
      limit: result.limit
    }
  });
});

export const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  
  const order = await getOrderByIdService(orderId);
  
  res.status(200).json({
    success: true,
    message: "Order fetched successfully",
    data: order
  });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  
  const order = await updateOrderStatusService(orderId, status);
  
  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: order
  });
});

export const deleteOrder = asyncHandler(async (req, res) => {
  await deleteOrderService(req.params.orderId);
  
  res.status(200).json({
    success: true,
    message: "Order deleted successfully"
  });
});
