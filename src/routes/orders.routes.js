const { Router } = require("express");

const OrdersController = require("../controllers/OrdersController");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.get("/orders", ordersController.index);
ordersRoutes.get("/orders/:id", ordersController.show);
ordersRoutes.post("/orders", ordersController.create);
ordersRoutes.put("/orders/:id", ordersController.update);
ordersRoutes.delete("/orders/:id", ordersController.delete);

module.exports = ordersRoutes;
