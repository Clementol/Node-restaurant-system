import {Op, where} from "sequelize";
import Food from "../models/food";
import Menu from "../models/menus";
import os from "os";
import Menu_Foods from "../models/menu_foods";

class MenuServices {
  constructor() {}

  /**
   * @description Create menu
   * @param {*} data
   * @returns menu, error
   */

  CreteMenu(data) {
    return new Promise((resolve, reject) => {
      Menu.create(data)
        .then((menu) => resolve(menu))
        .catch((error) => reject(error));
    });
  }

  /**
   * 
   * @param {*} menuId 
   * @param {*} data 
   * @returns menu, error
   */
  UpdateMenu(menuId, data) {
    return new Promise((resolve, reject) => {
      Menu.update(data, {where: {menuId: menuId}})
      .then(menu => resolve(menu))
      .catch(error => reject(error))
    })
  }

  /**
   * @description Get Menus With Foods
   * @param {*} vendorId 
   * @returns 
   */
  GetMenusWithFoods(vendorId) {
    return new Promise((resolve, reject) => {
      
        Menu.findAll({
          include: [{model: Food, as: "foods"}]
          // include: [
          //   {model: Food, as: "foods",
          //       where: {menuId: {[Op.eq]: "food.menuId"} },
          //   // through: Menu_Foods
          //   },
          // ],
        })
        .then(menu => {
         
          resolve(menu)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
}

export default new MenuServices();
