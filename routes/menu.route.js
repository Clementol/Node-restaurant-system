import { Router } from "express";
import { createMenu, getMenusWithFoods, updateMenu } from "../controllers/menu.controller";

const menuRouter = Router();

menuRouter.post("/menu/create", createMenu);
menuRouter.get("/menus/foods/:vendorId", getMenusWithFoods);
menuRouter.put("/menu/update/:menuId", updateMenu)

export { menuRouter };
