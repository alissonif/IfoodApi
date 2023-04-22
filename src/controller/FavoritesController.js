const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const sqliteConnection = require('../database/sqlite');

class FavoritesController {

  async index(request, response) {
    const { user_id, dish_id } = request.body;
    const favorites = await knex('favorites')
      .select('favorites.id as favorite','dishes.id as dish','dishes.title', 'dishes.image')
      .innerJoin('dishes', 'favorites.dish_id', 'dishes.id')
      .where('favorites.user_id', user_id)
    //.andWhere('favorites.dish_id', dish_id);
      response.json(favorites);
  }

  async create(request, response) {
    const { dish_id, user_id } = request.body;

    const checkFavoritesExists = await knex("favorites")
      .where({ dish_id: dish_id, user_id: user_id })
      .first();

      if (checkFavoritesExists) {
        throw new AppError("Este prato já foi favoritado para este usuário.");
      }
/*       const database = await sqliteConnection();
      const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])
      if (!user) {
        throw new AppError('Usuário não encontrado!');
      }
      const checkFavoritesExists2 = await database.get("SELECT * FROM favorites WHERE id = (?)", [user_id]);
    if(checkFavoritesExists2 && checkFavoritesExists2.id === user.id) {
      throw new AppError("Este prato existe.");
      console.log(checkFavoritesExists2,' e ',checkFavoritesExists2.id,' === ',user.id);
    }
    console.log('forenkey: ',user_id,dish_id );
 */
    await knex("favorites").insert({
      dish_id,
      user_id,
    });
    return response.json({message: "favoritado com sucesso"});
  }

  async delete(request, response) {
    const { id } = request.params;

    const favorite = await knex("favorites").where({ id }).del();
    if (favorite) {
      return response.json({ message: "Prato favoritado com sucesso!" });
    } else {
      throw new AppError("Este prato já foi excluido dos favoritados");
    }
  }
}

module.exports = FavoritesController;
