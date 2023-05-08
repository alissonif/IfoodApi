const { Router } = require("express");

const OrdersController = require("../controller/OrdersController");
const ensureAuthenticatedIsAdmin = require("../middlewares/ensureAuthenticatedIsAdmin");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.post("/", ordersController.create);

ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.get("/", ordersController.index);

ordersRoutes.put("/:id", ensureAuthenticatedIsAdmin, ordersController.update);
//ordersRoutes.put("/", ensureAuthenticatedIsAdmin, ordersController.update);

ordersRoutes.delete("/index/:id", ordersController.deleteIndex);
ordersRoutes.delete("/:id", ordersController.deleteShow);



module.exports = ordersRoutes;
