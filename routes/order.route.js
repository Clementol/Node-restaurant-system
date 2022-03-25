const { Router } = require("express");
const { createOrder } = require("../controllers/order.controller");
const {requireSignIn} = require("../middleware/authentication")

const orderRouter = Router();

orderRouter.post("/order/create", requireSignIn, createOrder);

module.exports = orderRouter;
