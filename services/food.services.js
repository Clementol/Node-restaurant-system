import Food from "../models/food";
import Menu_Foods from "../models/menu_foods";

class FoodServices {
  constructor() {}

  MenuFoodAssociation(menuData) {
    return new Promise(async (resolve, reject) => {
      await Menu_Foods.create(menuData)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  /**
   * @description Create Food
   * @param {*} data
   * @returns food, error
   */

  CreateFood(data) {
    return new Promise((resolve, reject) => {
      Food.create(data)

        // this.menuFoodAssociation(food.menuId)
        .then((food) => {
          resolve(food);
        })
        .catch((error) => reject(error));
    });
  }

  /**
   *
   * @param {*} foodId
   * @param {*} data
   */
  UpdateFood(foodId, data) {
    return new Promise((resolve, reject) => {
      Food.update(data, { where: { foodId: foodId } })
        .then((food) => {
          resolve(food);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default new FoodServices();
