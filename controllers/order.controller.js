const { ObjectId } = require("mongodb");
const OrderServices = require("../services/order.services");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @description create user orders 
 */
const createOrder = async (req, res) => {
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
    // let orderDataItems = {};
    orderData.orderId = orderId;
    orderData.userId = userId;
    orderData.vendorId = vendorId;
    orderData.totalAmount = totalAmount;
    orderData.paymentStatus = paymentStatus;
    orderData.paymentMethod = paymentMethod;
    orderData.orderStatus = orderStatus;

    let orderDataItems = []
    for (let orderItem of orderItems) {
      orderItem.orderItemId = ObjectId().toString();
      orderItem.orderId = orderId
      orderDataItems.push(orderItem)
    }
    await OrderServices.createOrder(orderData)
    .then(order => {
      OrderServices.createOrderItems(orderDataItems)
      .then(orderItems => {
        return res.status(201).json({order, orderItems})
      })
      .catch(error => {
        const msg = `Unable to create order items ${error}`
        return res.status(400).json({error: msg})
      })
    })
    .catch(error => {
      const msg = `Unable to create order ${error}`
      return res.status(400).json({error: msg})
    })

  } catch (error) {
    const msg = `Error creating order ${error}`;
    return res.status(500).json({ error: msg });
  }
};

module.exports = { createOrder };
