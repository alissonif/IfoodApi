const knex = require('../database/knex');

class DishesController{
  async create(request, response){
    const {name,image, description, category, price, ingredients }=request.body;
    const {user_id} = request.params;
    
    const dish_id= await knex('dishes').insert({
      name,
      image,
      description,
      category,
      price,
      ingredients,
    })

    const ingredientsInsert=ingredients.map(ingredient =>{
      return{
        dish_id,
        name,
      }
    });
    await knex('dishes').insert(ingredientsInsert)
  }
}

module.exports = DishesController