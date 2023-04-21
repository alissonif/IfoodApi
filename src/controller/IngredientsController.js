const knex = require("../database/knex");

class IngredientsController {
  async index(request, response) {
    const { user_id } = request.query;
    let ingredients = await knex("ingredients");
    const dishesWithIngredients = [];

    for (const ingredient of ingredients) {
      await knex("ingredients").orderBy('created_at', 'desc').
      dishesWithIngredients.push({
        ...ingredient,
      });
    }
    if (!user_id) {
      return response.json("error");
    } else {
      return response.json(dishesWithIngredients);
    }
  }
}

module.exports = IngredientsController;
