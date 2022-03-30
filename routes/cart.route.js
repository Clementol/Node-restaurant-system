const { Router } = require("express");
const { addToCart, getUserCarts, removeCartItem } = require("../controllers/cart.controller");
const {requireSignIn} = require("../middleware/authentication")

const cartRouter = Router();

cartRouter.post("/cart/create", requireSignIn, addToCart);
cartRouter.get("/carts", requireSignIn, getUserCarts);
cartRouter.delete("/cart/delete/:foodId", requireSignIn, removeCartItem);

module.exports = cartRouter;
