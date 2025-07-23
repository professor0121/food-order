import express from 'express';
import { isAuthenticated } from '../middleware/user.middleware.js';
import { cancelOrder, createOrder,trackOrder } from '../controllers/order.controller.js';

const route=express.Router();

route.post('/create-order',isAuthenticated,createOrder);
route.patch('/cancel-order/:orderId',isAuthenticated,cancelOrder);
route.get('/track-order/:orderId',isAuthenticated,trackOrder);


export default route;