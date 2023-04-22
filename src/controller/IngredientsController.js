const knex = require("../database/knex");

class IngredientsController {
  async index(request, response) {
    const {user_id} = request.params; // assume-se que a rota inclui um parâmetro "user_id"
    const ShowAllIngredintes= await knex('ingredients')
    //console.log(ShowAllIngredintes)

    const ingredients = await knex("ingredients")
      .where({ user_id }).orderBy("updated_at", "desc");
    return response.json(ingredients);
  }
  async show(request, response) {
    const ingredients = await knex("ingredients").orderBy("updated_at", "desc");
    return response.json(ingredients)
  }
}

module.exports = IngredientsController;
