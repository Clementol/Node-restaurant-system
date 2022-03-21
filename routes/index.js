import { foodRouter } from "./food.route"
import { menuRouter } from "./menu.route"
import { userRouter } from "./user.routes"
import { vendorRouter } from "./vendor.routers"


export default (app) => {
    
    app.use("/api/v1", userRouter)
    app.use("/api/v1", vendorRouter)
    app.use("/api/v1", menuRouter)
    app.use("/api/v1", foodRouter)
}