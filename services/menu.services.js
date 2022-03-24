const {Food, Menu} = require("../models")


/**
 * @description Create menu
 * @param {*} data
 * @returns menu, error
 */
const CreateMenu = (data) => {
  return new Promise((resolve, reject) => {
    Menu.create(data)
      .then((menu) => resolve(menu))
      .catch((error) => reject(error));
  });
};

/**
 *
 * @param {*} menuId
 * @param {*} data
 * @returns menu, error
 */
const UpdateMenu = (menuId, data) => {
  return new Promise((resolve, reject) => {
    Menu.update(data, { where: { menuId: menuId } })
      .then((menu) => resolve(menu))
      .catch((error) => reject(error));
  });
};

/**
 * @description Get Menus With Foods
 * @param {*} vendorId
 * @returns
 */
const GetMenusWithFoods = (vendorId) => {
  return new Promise((resolve, reject) => {
    Menu.findAll({
      where: { vendorId: vendorId },
      include: [{ model: Food, as: "foods" }],
      // include: [
      //   {model: Food, as: "foods",
      //       where: {menuId: {[Op.eq]: "food.menuId"} },
      //   // through: Menu_Foods
      //   },
      // ],
    })
      .then((menu) => {
        resolve(menu);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

module.exports = {CreateMenu, UpdateMenu, GetMenusWithFoods}
