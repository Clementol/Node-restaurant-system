const { ObjectId } = require("mongodb");
const CartServices = require("../services/cart.services");

const addToCart = async (req, res) => {
  let msg, data;
  try {
    const { userId } = req.user;
    const {
      cartItems: { foodId, quantity },
    } = req.body;

    await CartServices.checkUserCart(userId)
      .then((userCartExist) => {
        if (userCartExist) {
          const { cartId } = userCartExist;
          CartServices.checkCartItem(cartId, foodId)
            .then((cartItemExist) => {
              if (cartItemExist) {
                CartServices.updateCartItem(cartId, foodId, quantity)
                  .then((updatedCartItem) => {
                    return res.status(202).json({ updatedCartItem });
                  })
                  .catch((error) => {
                    msg = `Unable to update user cart item ${error}`;
                    return res.status(400).json({ error: msg });
                  });
              } else {
                //add item to cart
                const cartItemId = ObjectId().toString();
                data.cartItemId = cartItemId;
                data.cartId = cartId;
                data.foodId = foodId;
                data.quantity = quantity;
                CartServices.addItemToCart(data)
                  .then((cartItem) => {
                    return res.status(202).json({ cartItem });
                  })
                  .catch((error) => {
                    msg = `Unable to add item to user cart ${error}`;
                    return res.status(400).json({ error: msg });
                  });
              }
            })
            .catch((error) => {
              msg = `Unable to check to user's cart item ${error}`;
              return res.status(400).json({ error: msg });
            });
        }
        // create new cart
        const cartId = ObjectId().toString();
        data.cartId = cartId;
        data.userId = userId;
        CartServices.createNewCart(data).then((newUserCart) => {
          if (newUserCart) {
              const {cartId} = newUserCart
            const cartItemId = ObjectId().toString();
            data.cartItemId = cartItemId;
            data.cartId = cartId;
            data.foodId = foodId;
            data.quantity = quantity;
            CartServices.addItemToCart(data)
              .then((cartItem) => {
                return res.status(202).json({ cartItem });
              })
              .catch((error) => {
                msg = `Unable to add item to user cart ${error}`;
                return res.status(400).json({ error: msg });
              });
          }
        })
        .catch((error) => {
            msg = `Unable to create new cart ${error}`;
            return res.status(400).json({ error: msg });
          });
      })
      .catch((error) => {
        msg = `Unable to check to user's cart ${error}`;
        return res.status(400).json({ error: msg });
      });
  } catch (error) {
    msg = `Error adding item to cart`;
    return res.status(500).json({ error: msg });
  }
};

module.exports = {addToCart}