const { ObjectId } = require("mongodb");

const createOrder = (req, res) => {
  try {
    const {
      vendorId,
      totalAmount,
      paymentStatus,
      paymentMethod,
      orderStatus,
      orderItems,
    } = req.body;
    const orderId = ObjectId().toString();
    const userId = req.user.userId;
    let orderData = {};
    let orderDataItems = {};
    orderData.orderId = orderId;
    orderData.userId = userId;
    orderData.vendorId = vendorId;
    orderData.totalAmount = totalAmount;
    orderData.paymentStatus = paymentStatus;
    orderData.paymentMethod = paymentMethod;
    orderData.orderStatus = orderStatus;

    orderDataItems.orderId = orderId;
    orderDataItems.orderItems = orderItems;
  } catch (error) {
    const msg = `Error creating order`;
    return res.status(500).json({ error: msg });
  }
};

module.exports = {createOrder}