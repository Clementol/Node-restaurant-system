// import { updateUser } from "../controllers/user.controllers";
// import AuthHelper from "../helpers/auth.helper";
const {Vendor} = require("../models");

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

module.exports = { CreateVendor, UpdateVendor };
