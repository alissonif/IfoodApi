const { Router } = require("express");

const usersRouter = require("./users.routes");
const dishesRouter = require("./dishes.routes");
const ingredientsRouter = require("./ingredients.routes");
const ordersRouter = require("./orders.routes");
//const orderDishesRouter = require("./orderDishes.routes");
//const favoritesRouter = require("./favorites.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/dishes", dishesRouter);
routes.use("/ingredients", ingredientsRouter);
//routes.use("/orders", ordersRouter);
//routes.use("/orderDishes", orderDishesRouter);
//routes.use("/favoritesRouter", favoritesRouter);


module.exports = routes;
