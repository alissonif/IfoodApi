const { Router } = require("express");

const FavoritesController = require("../controller/FavoritesController");

const favoritesRoutes = Router();

const favoritesController = new FavoritesController();


favoritesRoutes.get("/", favoritesController.index);
favoritesRoutes.post("/", favoritesController.create);
favoritesRoutes.delete("/:id", favoritesController.delete);

module.exports = favoritesRoutes;