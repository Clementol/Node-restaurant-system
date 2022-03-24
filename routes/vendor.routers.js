const { Router } = require("express");
const { createVendor, updateVendor } = require("../controllers/vendor.controllers");
const upload = require("../middleware/multer");

const vendorRouter = Router();

vendorRouter.post("/vendor/create", upload.single("vendorImage"), createVendor);
vendorRouter.put("/vendor/update/:vendorId", upload.single("vendorImage"), updateVendor);

module.exports = vendorRouter;
