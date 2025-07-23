import { createOrder, cancelOrder ,trackOrder} from "../dao/order.dao.js";

export const createOrderService = async ({ user, items }) => {
  if (!items || items.length === 0) {
    throw new Error("Order must have at least one item.");
  }

  const totalPrice = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return await createOrder({
    user,
    items,
    totalPrice,
  });
};


export const cancelOrderService = async ( orderId, userId ) => {
  return await cancelOrder(orderId, userId);
}

export const trackOrderService= async (orderId) => {
  return await trackOrder(orderId);
}