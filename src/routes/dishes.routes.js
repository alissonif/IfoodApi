const { Router } = require("express");

const DishesController = require("../controller/DishesController");

const dishesRoutes = Router();

/*function myMiddleware(request, response, next) {
  console.log("Middleware");
  console.log(request.body);
  if (!request.body.isAdmin) {
    return response.json({ message: "user unauthorized" });
  }
  next();
}
*/
const dishesController = new DishesController();

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/:user_id", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);
// dishesRoutes.put("/:id", dishesController.update);

module.exports = dishesRoutes;