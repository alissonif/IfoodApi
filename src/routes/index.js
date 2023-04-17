const { Router } = require("express");

const usersRouter = require("./users.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/dishes", Router);

module.exports = routes;
