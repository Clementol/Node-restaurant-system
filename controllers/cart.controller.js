const { ObjectId } = require("mongodb");
const CartServices = require("../services/cart.services");

const addToCart = async (req, res) => {
  try {
    let msg, data = {};
    const { userId } = req.user;
    const {
      cartItems: { foodId, quantity },
    } = req.body;
    
    await CartServices.checkUserCart(userId)
      .then(async(userCartExist) => {
        if (userCartExist != null) {
          const { cartId } = userCartExist;
          CartServices.checkCartItem(cartId, foodId)
          .then( async (cartItemExist) => {
              if (cartItemExist) {
                await CartServices.updateCartItem(cartId, foodId, quantity)
                  .then((updatedCartItem) => {
                    return res.status(202).json({ updatedCartItem });
                  })
                  .catch((error) => {
                    msg = `Unable to update user cart item ${error}`;
                    return res.status(400).json({ error: msg });
                  });
              } else {

                //add new item to cart
                const cartItemId = ObjectId().toString();
                data.cartItemId = cartItemId;
                data.cartId = cartId;
                data.foodId = foodId;
                data.quantity = quantity;
                await CartServices.addItemToCart(data)
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
        } else if (userCartExist == null) {
          // create new cart
   
          const cartId = ObjectId().toString();
          data.cartId = cartId;
          data.userId = userId;
         
          await CartServices.createNewCart(data)
            .then((newUserCart) => {
              
              if (newUserCart) {
                const { cartId } = newUserCart;
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
        }
      })
      .catch((error) => {
       
        msg = `Unable to check user's cart ${error}`;
        return res.status(400).json({ error: msg });
      });
  } catch (error) {
    msg = `Error adding item to cart`;
    return res.status(500).json({ error: msg });
  }
};

const getUserCarts = async (req, res) => {
  let msg = ""
  try {
    const { userId } = req.user
    await CartServices.checkUserCart(userId)
    .then(async userCartExist => {
      if (userCartExist) {

        const {cartId} = userCartExist
        await CartServices.getUserCart(cartId)
        .then((cartItems) => {
          return res.status(200).json({cartItems})
        })
        .catch(error => {
          msg = `Unable to get user cart items ${error}`
          return res.status(400).json({error: msg})
        })
      } else {
        return res.status(200).json({cartItems: []})
      }
    })
    .catch(error => {
      msg = `Unable to find user cart ${error}`
      return res.status(400).json({error: msg})
    })
    
  } catch (error) {
    msg = `Error getting cart items ${error}`;
    return res.status(500).json({ error: msg });
  }
}

const removeCartItem = async (req, res) => {
  let msg = ""
  try {
    const {userId} = req.user
    const {foodId} = req.params
    await CartServices.checkUserCart(userId)
    .then(async userCartExist => {
      const {cartId} = userCartExist
      await CartServices.removeCartItem(cartId, foodId)
      .then((item) => {
        return res.status(200).json({item})
      })
      .catch(error => {
        msg = `Unable to remove cart item ${error}`
        return res.status(400).json({error: msg})
      })
    })
  } catch (error) {
    msg = `Error removing cart item ${error}`;
    return res.status(500).json({ error: msg });
  }
}
module.exports = { addToCart, getUserCarts, removeCartItem };
