const { Router, response } = require("express");

const DishesController = require("../controller/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const uploadConfig = require("../configs/upload");
const multer = require("multer");
const DishImageController = require("../controller/DishImageController")

const dishesRoutes = Router();

const dishesController = new DishesController();
const dishImageController = new DishImageController();

const upload= multer(uploadConfig.MULTER)

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.put("/:id", dishesController.update);
dishesRoutes.patch(
  "/:id",
  ensureAuthenticated,
  upload.single("avatar"),dishImageController.update
);

module.exports = dishesRoutes;
