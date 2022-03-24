const { ObjectId } = require("mongodb");
const FoodServices = require("../services/food.services");

const createFood = (req, res) => {
  try {
    const { name, price, menuId } = req.body;
    const image = req.file;
    const foodId = ObjectId().toString();
    let data = {};
    data.foodId = foodId;
    if (image != null) {
      data.image = image.location;
    }
    data.name = name;
    data.price = price;
    data.menuId = menuId;

    FoodServices.CreateFood(data)
      .then((food) => {
        return res.status(201).json({food})
      })
      .catch((error) => {
        const msg = `Unable to add food ${error}`;
        return res.status(400).json({ error: msg });
      });
  } catch (error) {
    const msg = `Error creating food ${error}`;
    return res.status(500).json({ error: msg });
  }
};

const updateFood = (req, res) => {
  try {
    const { name, price, menuId } = req.body;
    const image = req.file;
    const {foodId} = req.params;
    let data = {};

    if (menuId == null) {
      const msg = `Menu id is required`;
      return res.status(400).json({ error: msg });
    }
    data.menuId = menuId;

    if (name != null) {
      data.name = name;
    }
    if (price != null) {
      data.price = price;
    }

    if (image != null) {
      data.image = image.location;
    }

    FoodServices.UpdateFood(foodId, data)
      .then((food) => {
        const [affectedCount] = food;
        if (affectedCount == 0) {
          const msg = `No food found`;
          return res.status(400).json({ error: msg });
        }
        return res.status(202).json(`Food Updated`);
      })
      .catch((error) => {
        const msg = `Unable to update food ${error}`
        return res.status(400).json({error: msg})
      });
  } catch (error) {
    const msg = `Error updating food ${error}`;
    return res.status(500).json({ error: msg });
  }
};


module.exports = { createFood, updateFood };
