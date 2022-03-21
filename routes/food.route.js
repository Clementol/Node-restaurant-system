import { Router } from "express";
import { createFood, updateFood } from "../controllers/food.controllers";
import upload from "../middleware/multer";

const foodRouter = Router();

foodRouter.post("/food/create", upload.single("foodImage"), createFood);
foodRouter.patch("/food/update/:foodId", upload.single("foodImage"), updateFood);

export { foodRouter };
