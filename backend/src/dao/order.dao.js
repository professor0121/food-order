import Order from '../models/order.model.js';

export const findOrderByUser=async (user)=>{
        return await Order.find({user});
}

export const createOrder=async (order)=>{
    const newOrder= await Order.create(order);
    await newOrder.save();
    return newOrder;
}

export const findOrderById=async (id)=>{
    return await Order.findById(id);
}


export const cancelOrder = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });

  if (!order) {
    throw new Error("Order not found or unauthorized access");
  }

  if (order.status === "cancelled") {
    throw new Error("Order already cancelled");
  }

  order.status = "cancelled";
  await order.save();

  return order;
};


export const trackOrder = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });

  if (!order) {
    throw new Error("Order not found or unauthorized access");
  }

  return order;
};
