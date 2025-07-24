import express from 'express';
import { adminAuth } from '../middleware/admin.middleware.js';
import { 
  getAllOrders, 
  getOrderById, 
  updateOrderStatus, 
  deleteOrder 
} from '../controllers/adminOrder.controller.js';

const route = express.Router();

route.get('/orders', adminAuth, getAllOrders);
route.get('/orders/:orderId', adminAuth, getOrderById);
route.put('/orders/:orderId/status', adminAuth, updateOrderStatus);
route.delete('/orders/:orderId', adminAuth, deleteOrder);

export default route;
