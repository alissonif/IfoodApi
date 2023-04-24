const { Router } = require("express");

const IngredientsController = require("../controller/IngredientsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ingredientsRoutes = Router();

const ingredientsController = new IngredientsController();

ingredientsRoutes.get("/",ensureAuthenticated, ingredientsController.index);
ingredientsRoutes.get("/",ensureAuthenticated, ingredientsController.show);
/*
ingredientsRoutes.post("/:user_id", ingredientsController.create);
ingredientsRoutes.delete("/:id", ingredientsController.delete); */

module.exports = ingredientsRoutes;
