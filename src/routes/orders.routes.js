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

ordersRoutes.put("/:id", ordersController.update);
ordersRoutes.put("/:id", ensureAuthenticatedIsAdmin, ordersController.updateStatus);

ordersRoutes.delete("/index/:id", ordersController.deleteAll);
ordersRoutes.delete("/:id", ordersController.deleteOne);



module.exports = ordersRoutes;
