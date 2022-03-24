const { Router } = require("express");
const { createFood, updateFood } = require("../controllers/food.controllers");
const upload = require("../middleware/multer");

const foodRouter = Router();

foodRouter.post("/food/create", upload.single("foodImage"), createFood);
foodRouter.patch("/food/update/:foodId", upload.single("foodImage"), updateFood);

module.exports = foodRouter;
