const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class FavoritesController {
  /*   async index(req, res) {
    const favorites = await knex("favorites")
    .join("dishes", "favorites.dish_id", "=", "dishes.id")
    .select("dishes.*")
    .where("favorites.user_id", req.params.user_id)

    return res.json(favorites);
  } */

  /*   async index(req, res) {
    // const knex = require("knex")(config);
    const userId = req.params.user_id;
    const query = knex
      .select("dishes.*")
      .from("dishes")
      .innerJoin("favorites", "dishes.id", "favorites.dish_id")
      .where("favorites.user_id", userId);
    const result = await query;
    return res.json(result);
  } */

  async index(req, res) {
    const { user_id, dish_id } = req.body;
    const favorites = await knex('favorites')
      .select('favorites.id', 'dishes.*')
      .innerJoin('dishes', 'favorites.dish_id', 'dishes.id')
      .where('favorites.user_id', user_id)
      // .andWhere('favorites.dish_id', dish_id);
    res.json(favorites);
  }

  async create(req, res) {
    const { dish_id, user_id } = req.body;

    const checkFavoritesExists = await knex("favorites")
      .where({ dish_id: dish_id, user_id: user_id })
      .first();

    if (checkFavoritesExists) {
      throw new AppError("Este prato já foi favoritado para este usuário.");
    }

    const favorite = await knex("favorites").insert({
      dish_id,
      user_id,
    });

    return res.json(favorite);
  }

  async delete(req, res) {
    const { id } = req.params;

    const favorite = await knex("favorites").where({ id }).del();
    if (favorite) {
      return res.json({ message: "Prato favoritado com sucesso!" });
    } else {
      throw new AppError("Este prato já foi excluido dos favoritados");
    }
  }
}

module.exports = FavoritesController;
