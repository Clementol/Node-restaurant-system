const cartRouter = require("./cart.route")
const foodRouter = require("./food.route")
const menuRouter = require("./menu.route")
const orderRouter = require("./order.route")
const userRouter = require("./user.routes")
const vendorRouter = require("./vendor.routers")

module.exports = (app) => {
    const v1 = "/api/v1"
    app.use(v1, userRouter)
    app.use(v1, vendorRouter)
    app.use(v1, menuRouter)
    app.use(v1, foodRouter)
    app.user(v1, cartRouter)
    app.use(v1, orderRouter)

}