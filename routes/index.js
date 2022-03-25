const foodRouter = require("./food.route")
const menuRouter = require("./menu.route")
const orderRouter = require("./order.route")
const userRouter = require("./user.routes")
const vendorRouter = require("./vendor.routers")

module.exports = (app) => {
    
    app.use("/api/v1", userRouter)
    app.use("/api/v1", vendorRouter)
    app.use("/api/v1", menuRouter)
    app.use("/api/v1", foodRouter)
    app.use("/api/v1", orderRouter)
}