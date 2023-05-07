const AppError = require("../utils/AppError");
const knex = require("../database/knex");
class FavoritesController {

  async create(request, response) {
    const { dish_id, user_id } = request.body;

    const dish = await knex("dishes").where("id", dish_id).first();

    const user = await knex("users").where("id", user_id).first();

    if (!dish || !user) {
      throw new AppError("Prato ou usuário não existe.");
    }

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
    const favarites = await knex("favorites").insert({
      dish_id,
      user_id,
    });
    return response.json(favarites);
  }

  async index(request, response) {
    const { user_id, dish_id } = request.body;

    const users = await knex("users").where("id", user_id).first();

    if (!users) {
      throw new AppError("Usuário não existe.");
    }

    const favorite = await knex("favorites").where("id", user_id).first();

    if (!favorite) {
      throw new AppError("Favorito não existe.");
    }

    const favorites = await knex("favorites")
      .select(
        "favorites.id as favorite",
        "dishes.id as dish",
        "dishes.title",
        "dishes.image"
      )
      .innerJoin("dishes", "favorites.dish_id", "dishes.id")
      .where("favorites.user_id", user_id);
    //.andWhere('favorites.dish_id', dish_id);
    response.json(favorites);
  }

  async delete(request, response) {
    const { id } = request.params;
  
    const favorite = await knex("favorites").where({ id }).first();
  
    if (!favorite) {
      throw new AppError("Favorito não encontrado.");
    }
  
    const deletedFavorite = await knex("favorites").where({ id }).delete();
  
    return response.json({
      message: "Favorito excluído com sucesso.",
      favorite: deletedFavorite,
    });
  }
  
}

module.exports = FavoritesController;
