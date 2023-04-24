const knex = require("../database/knex");
const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { title, image, description, category, price, ingredients } =
      request.body;
    const user_id  = request.user.id;
    const database = await sqliteConnection();

    const checkUserExists = await database.get(
      "select * from users where id= (?)",
      [user_id]
    );

    if (!checkUserExists) {
      throw new AppError("Este usuário não está cadastrado.");
    }

    const checkDishExists = await knex("dishes")
      .where({ title: title, user_id: user_id })
      .first();

    if (checkDishExists) {
      throw new AppError("Este prato já foi cadastrado para este usuário.");
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

    if (!dish) {
      throw new AppError("Nenhum prato não cadastrado");
    }

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
    const { title, ingredients } = request.query;
    const user_id  = request.user.id;

    let dishes;

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

      dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.title",
          "dishes.image",
          "dishes.description",
          "dishes.category",
          "dishes.price",
          "dishes.user_id",
          "dishes.updated_at",
        ])
        .where("dishes.user_id", user_id)
        .whereLike("dishes.title", `%${title}%`)
        .whereIn("name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .orderBy("dishes.title");
    } else {
      dishes = await knex("dishes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("updated_at", "desc");
    }

    const dishesWithIngredients = [];

    for (const dish of dishes) {
      const dishIngredients = await knex("ingredients").where({
        dish_id: dish.id,
      });
      dishesWithIngredients.push({
        ...dish,
        ingredients: dishIngredients,
      });
    }

    if (dishesWithIngredients.length > 0) {
      return response.json(dishesWithIngredients);
    } else {
      response.status(404).send("Nenhum prato encontrado.");
    }
  }

  async update(request, response) {
    const { id } = request.params;
    //const user_id=request.user.id;
    //console.log(user_id)
    //const id  = request.user.id;
    //console.log(id)
    const { title, image, category, description, price, ingredients } =
      request.body;
    const database = await sqliteConnection();

    const dish = await database.get("select * from dishes where id = ?", [id]);
    if (!dish) {
      throw new AppError("Prato não encontrado");
    }
    const { user_id } = dish;

    dish.title = title ?? dish.title;
    dish.image = image ?? dish.image;
    dish.category = category ?? dish.category;
    dish.description = description ?? dish.description;
    dish.price = price ?? dish.price;
    //dish.user_id = user_id ?? dish.user_id;

 

    await database.run(
      `update dishes set 
        title = ?,
        image = ?,
        description = ?,
        category = ?,
        price = ?,
        user_id = ?,
        updated_at = datetime('now') 
        where id = ?
        `,
      [
        dish.title,
        dish.image,
        dish.description,
        dish.category,
        dish.price,
        dish.user_id,
        id,
      ]
    );

    await database.run("DELETE FROM ingredients WHERE dish_id = ?", [id]);

    for (const ingredient of ingredients) {
      await database.run(
        "insert into ingredients (name, dish_id, user_id) values (?, ?, ?)",
        [ingredient, id, user_id]
      );
    }

    return response
      .status(200)
      .json({ message: "Prato Atualizado com sucesso!" });
  }
}

module.exports = DishesController;
