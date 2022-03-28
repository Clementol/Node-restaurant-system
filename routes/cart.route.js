const { Router } = require("express");
const { addToCart } = require("../controllers/cart.controller");
const {requireSignIn} = require("../middleware/authentication")

const cartRouter = Router();

cartRouter.post("/cart/create", requireSignIn, addToCart);

module.exports = cartRouter;
