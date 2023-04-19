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

dishesRoutes.post("/:user_id", dishesController.create);
/* dishesRoutes.delete("/", dishesController.delete);
dishesRoutes.get("/", dishesController.show);
dishesRoutes.get("/:id", dishesController.index);
dishesRoutes.put("/:id", dishesController.update);
 */
module.exports = dishesRoutes;
