const ensureAuthenticatedIsAdmin = require("../middlewares/ensureAuthenticatedIsAdmin");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const { Router } = require("express");

const OrdersController = require("../controller/OrdersController");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.post("/",ordersController.create);

// ordersRoutes.get("/orders", ordersController.index);
// ordersRoutes.get("/orders/:id", ordersController.show);
// ordersRoutes.put("/orders/:id", ordersController.update);
// ordersRoutes.delete("/orders/:id", ordersController.update);

module.exports = ordersRoutes;
