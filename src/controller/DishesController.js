const knex = require("../database/knex");
const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { title, image, description, category, price, ingredients } =
      request.body;
    const { user_id } = request.params;

    const database = await sqliteConnection();
    const checkDishExists = await database.get(
      "select * from dishes where title= (?)",
      [title]
    );

    if (checkDishExists) {
      throw new AppError("Este prato já foi cadastrado.");
    }

    const [dish_id] = await knex("dishes").insert({
      title,
      image,
      description,
      category,
      price,
      user_id,
    });

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        name: ingredient,
        dish_id,
        user_id,
      };
    });
    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json({ message: "Prato criado com sucesso!" });
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name");
    return response.json({
      ...dish,
      ingredients,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const database = await sqliteConnection();
    const checkDishExists = await database.get(
      "select * from dishes where id = (?)",
      [id]
    );

    if (!checkDishExists) {
      throw new AppError("Este prato já foi deletado ou index incorreto.");
    }

    await knex("dishes").where({ id }).delete();

    return response.json({ message: "Prato deletado com sucesso!" });
  }

  async index(request, response) {
    const { user_id, title, ingredients } = request.query;

    let dishes;

    if (ingredients) {
      const filterIngredients = ingredients.split(',').map( ingredient => ingredient.trim());
      console.log(filterIngredients);
      dishes = await knex('ingredients')
      .whereIn('name', filterIngredients)
    } else {
      dishes = await knex("dishes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }
    return response.json(dishes);
  }

  async update(request, response) {
    /* async update(request, response) {
  const { name, email } = request.body;
  const { id } = request.params;
  const database = await sqliteConnection();
  const user = await database.get("select * from users where id = ?", [id]);

  if (!user) {
    throw new AppError("usuário não encontrado");
  }

  const userWithUpdatedEmail = await database.get(
    "select * from users where email = ?",
    [email]
  );

  if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
    throw new AppError("este email já esta em uso");
  }

  user.name = name ?? user.name;
  user.email = email ?? user.email;

  await database.run(
    `update users set 
  name = ?,
  email = ?,
  created_at = datetime('now') //updated_at
  where id = ?`,
    [user.name, user.email, new Date(), id]
  );

  return response.json();
} */
  }
}

module.exports = DishesController;
