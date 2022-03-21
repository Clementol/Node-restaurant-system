import { updateUser } from "../controllers/user.controllers";
import AuthHelper from "../helpers/auth.helper";
import Vendor from "../models/vendor";

class VendorServices {
  constructor() {}

  /**
   * @description Create Vendor
   * @param {*} data
   */
  //
  CreateVendor(data) {
    return new Promise((resolve, reject) => {
      Vendor.create(data)
        .then((user) => resolve(user))
        .catch((error) => reject(error));
    });
  }

  UpdateVendor(vendorId, data) {
      return new Promise((resolve, reject) => {
          Vendor.update(data, 
            {where: {vendorId: vendorId}})
            .then(vendor => {
                resolve(vendor)
            })
            .catch(error => {
                reject(error)
            })
      })
  }
}

export default new VendorServices();
