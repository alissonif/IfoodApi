const { Router } = require("express");

const OrdersController = require("../controller/OrdersController");
const ensureAuthenticatedIsAdmin = require("../middlewares/ensureAuthenticatedIsAdmin");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.post("/", ordersController.create);

ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.delete("/:id", ordersController.delete);
ordersRoutes.get("/", ensureAuthenticatedIsAdmin, ordersController.index);
ordersRoutes.put("/",ensureAuthenticatedIsAdmin, ordersController.update);

module.exports = ordersRoutes;
