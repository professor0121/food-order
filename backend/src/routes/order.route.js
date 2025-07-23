import express from 'express';
import { isAuthenticated } from '../middleware/user.middleware.js';
import { createOrder ,cancelOrder, getOrder } from '../controllers/order.controller.js';

const route=express.Router();

route.post('/create-order',isAuthenticated,createOrder);
route.delete('/cancel-order/:orderId',isAuthenticated,createOrder);
route.get('/get-order/:orderId',isAuthenticated,createOrder);


export default route;