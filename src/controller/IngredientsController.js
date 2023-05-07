const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class IngredientsController {
  async index(request, response) {
    const user_id  = request.user.id;
    
    const ingredients = await knex("ingredients")
      .where({ user_id }).orderBy("updated_at", "desc");
      if( ingredients.length > 0 ) {
        return response.json(ingredients);
      }else {
      throw new AppError("Nenhum ingrediente encontrado");
      }
  }
  async show(request, response) {
    const ingredients = await knex("ingredients").orderBy("updated_at", "desc");
    return response.json(ingredients)
  }
}

module.exports = IngredientsController;
