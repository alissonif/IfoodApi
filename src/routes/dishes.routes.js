const { Router, response } = require("express");

const ensureAuthenticatedIsAdmin = require("../middlewares/ensureAuthenticatedIsAdmin");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const uploadConfig = require("../configs/upload");
const multer = require("multer");
const DishImageController = require("../controller/DishImageController");
const DishesController = require("../controller/DishesController");

const dishesRoutes = Router();

const dishesController = new DishesController();
const dishImageController = new DishImageController();

const upload = multer(uploadConfig.MULTER);

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);

dishesRoutes.post("/", ensureAuthenticatedIsAdmin, dishesController.create);
dishesRoutes.delete(
  "/:id",
  ensureAuthenticatedIsAdmin,
  dishesController.delete
);
dishesRoutes.put("/:id", ensureAuthenticatedIsAdmin, dishesController.update);
dishesRoutes.patch(
  "/:id",
  ensureAuthenticatedIsAdmin,
  upload.single("avatar"),
  dishImageController.update
);

module.exports = dishesRoutes;
