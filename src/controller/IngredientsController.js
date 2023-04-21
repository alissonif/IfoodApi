const knex = require("../database/knex");

class IngredientsController {
  async index(request, response) {
    const { user_id } = request.params;
    console.log(user_id);
    let ingredients = await knex("ingredients");
    const dishesWithIngredients = [];

    for (const ingredient of ingredients) {
      await knex("ingredients").where({ user_id }).orderBy("id", "asc");
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
