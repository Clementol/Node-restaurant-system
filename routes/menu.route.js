const { Router } = require("express");
const { createMenu, getMenusWithFoods, updateMenu } = require("../controllers/menu.controller");

const menuRouter = Router();

menuRouter.post("/menu/create", createMenu);
menuRouter.get("/menus/foods/:vendorId", getMenusWithFoods);
menuRouter.put("/menu/update/:menuId", updateMenu)

module.exports = menuRouter;
