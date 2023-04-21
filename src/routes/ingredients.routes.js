const { Router } = require("express");

const IngredientsController = require("../controller/IngredientsController");

const ingredientsRoutes = Router();

const ingredientsController = new IngredientsController();


ingredientsRoutes.get("/", ingredientsController.index);
/* ingredientsRoutes.get("/:id", ingredientsController.show);
ingredientsRoutes.post("/:user_id", ingredientsController.create);
ingredientsRoutes.delete("/:id", ingredientsController.delete); */

module.exports = ingredientsRoutes;