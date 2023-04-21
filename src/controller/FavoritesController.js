const knex = require("../database/connection");

class FavoritesController {
  async index(req, res) {
    const favorites = await knex("favorites")
      .where("id_user", req.params.id_user)
      .join("dishes", "favorites.id_dish", "=", "dishes.id")
      .select("dishes.*");

    return res.json(favorites);
  }

  async create(req, res) {
    const { id_user, id_dish } = req.body;

    const favorite = await knex("favorites").insert({
      id_user,
      id_dish,
    });

    return res.json(favorite);
  }

  async delete(req, res) {
    const { id } = req.params;

    const favorite = await knex("favorites").where({ id }).del();

    return res.json(favorite);
  }
}

module.exports = FavoritesController;
