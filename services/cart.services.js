const { Cart, Cart_Items } = require("../models");

/**
 *
 * @param {*} userId
 * @description Check for user cart
 */
const checkUserCart = (userId) => {
  return new Promise((resolve, reject) => {
    Cart.findOne({ where: { userId: userId } })
      .then((cart) => {
     
        if (cart != null) {
          resolve(cart);
        }else {
    
          resolve(cart)
        }

      })
      .catch((error) => {
        reject(error);
       
      });
  });
};

/**
 *
 * @param {*} cartId
 * @param {*} foodId
 * @description Check for cart item
 */
const checkCartItem = (cartId, foodId) => {
  return new Promise((resolve, reject) => {
    Cart_Items.findOne({ where: { cartId: cartId, foodId: foodId } })
      .then((cartItemExist) => {
        resolve(cartItemExist);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 *
 * @param {*} cartId
 * @param {*} foodId
 * @param {*} quantity
 * @description Update cart item quatity
 */
const updateCartItem = (cartId, foodId, quantity) => {
  return new Promise((resolve, reject) => {
    Cart_Items.increment("quantity",  {by: quantity,
      where: { cartId: cartId, foodId: foodId } }
    )
      .then((updatedCartItem) => {
        resolve(updatedCartItem);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * @param {*} data
 * @description Add item to cart
 */
const addItemToCart = (data) => {
  return new Promise((resolve, reject) => {
    Cart_Items.create(data)
      .then((cartItem) => {
        resolve(cartItem);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 *
 * @param {*} data
 * @description Create new user cart
 */
const createNewCart = (data) => {
  return new Promise((resolve, reject) => {
    Cart.create(data)
      .then((userCart) => {
        resolve(userCart);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const addToCart = () => {};

module.exports = {
  checkUserCart,
  checkCartItem,
  updateCartItem,
  addItemToCart,
  createNewCart,
};
