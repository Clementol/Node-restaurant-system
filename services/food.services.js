const {Food} = require("../models");


/**
 * @description Create Food
 * @param {*} data
 * @returns food, error
 */

const CreateFood = (data) => {
  return new Promise((resolve, reject) => {
    Food.create(data)

      // this.menuFoodAssociation(food.menuId)
      .then((food) => {
        resolve(food);
      })
      .catch((error) => reject(error));
  });
};

/**
 *
 * @param {*} foodId
 * @param {*} data
 */
const UpdateFood = (foodId, data) => {
  return new Promise((resolve, reject) => {
    Food.update(data, { where: { foodId: foodId } })
      .then((food) => {
        resolve(food);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = { CreateFood, UpdateFood };
