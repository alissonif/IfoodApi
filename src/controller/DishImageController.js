
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishImageController {
  async update(req, res) {
    const user_id = req.user.id;
    const avatarFilename = req.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishes").where({ id: user_id }).first();

    if (!dish) {
      throw new AppError("Somente o admin pode mudar a imagem do prato", 401);
    }
    if (dish.image) {
      await diskStorage.deleteFile(dish.image);
    }
    const filename = await diskStorage.saveFile(avatarFilename);
    dish.image = filename;

    await knex("dishes").update(dish).where({ id: user_id });

    return res.json(dish);
  }
}

module.exports = DishImageController;