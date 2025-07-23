import asyncHandler from "../utils/asyncHandler.js";
import { createOrderService , cancelOrderService ,trackOrderService} from "../services/order.service.js";

export const createOrder = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const { items } = req.body;

    const order = await createOrderService({ user, items });

    res.status(201).json({
        message: "Order created successfully",
        order,
        user
    });
})
export const cancelOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user._id; 

    const result = await cancelOrderService(orderId, userId);
    res.status(200).json({ message: "Order cancelled successfully", order: result });
})


export const trackOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user._id; 

    const result = await trackOrderService(orderId, userId);
    res.status(200).json({ message: "Order tracked successfully", order: result });
})