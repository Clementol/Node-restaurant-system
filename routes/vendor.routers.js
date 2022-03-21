import { Router } from "express";
import { createVendor, updateVendor } from "../controllers/vendor.controllers";
import upload from "../middleware/multer";

const vendorRouter = Router();

vendorRouter.post("/vendor/create", upload.single("vendorImage"), createVendor);
vendorRouter.put("/vendor/update/:vendorId", upload.single("vendorImage"), updateVendor);

export { vendorRouter };
