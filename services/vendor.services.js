// import { updateUser } from "../controllers/user.controllers";
// import AuthHelper from "../helpers/auth.helper";
const {Vendor, Order, Order_Items, Food} = require("../models");

/**
 * @description Create Vendor
 * @param {*} data
 */
//
const CreateVendor = (data) => {
  return new Promise((resolve, reject) => {
    Vendor.create(data)
      .then((user) => resolve(user))
      .catch((error) => reject(error));
  });
};

const UpdateVendor = (vendorId, data) => {
  return new Promise((resolve, reject) => {
    Vendor.update(data, { where: { vendorId: vendorId } })
      .then((vendor) => {
        resolve(vendor);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * 
 * @param {*} vendorId 
 * @description Get vendor orders 
 */
const getVendorOrders = (vendorId) => {
 
  return new Promise((resolve, reject) => {
    Order.findAll({where: {vendorId: vendorId}, 
      include: [
        {model: Order_Items, as: "orderItems",
          include: [{model: Food, as: "food"}]
        },
      ], 
  
    })
    .then((vendor) => resolve(vendor))
    .catch(error => reject(error))
  })
}

/**
 * 
 * @param {*} vendorId 
 * @param {*} orderIds 
 * @param {*} orderStatus 
 * @description Update vendor orders 
 */
const updateVendorOrders = (vendorId, orderIds, orderStatus) => {
  return new Promise((resolve, reject) => {
    Order.update({orderStatus}, {
      where: {
        orderId: orderIds,
        vendorId: vendorId,
      }
    })
    .then(order => {
      resolve(order)
    })
    .catch(error => {
      reject(error)
    })
  })
}
module.exports = { CreateVendor, UpdateVendor, getVendorOrders, updateVendorOrders };
