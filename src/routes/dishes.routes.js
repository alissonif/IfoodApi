const { Router } = require("express");

const DishController = require("../controller/DishController");

const dishRoutes = Router();

/*function myMiddleware(request, response, next) {
  console.log("Middleware");
  console.log(request.body);
  if (!request.body.isAdmin) {
    return response.json({ message: "user unauthorized" });
  }
  next();
}
*/
const dishController = new DishController();

dishRoutes.put("/:id", dishController.update);

module.exports = dishRoutes;
