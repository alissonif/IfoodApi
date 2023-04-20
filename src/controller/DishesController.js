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
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

      dishes = await knex("ingredients")
        .select(["dishes.id", "dishes.title","dishes.image","dishes.description","dishes.category","dishes.price","dishes.user_id"])
        .where("dishes.user_id", user_id)
        .whereLike("dishes.title", `%${title}%`)
        .whereIn("name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .orderBy("dishes.title");
    } else {
      dishes = await knex("dishes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userIngredient = await knex("ingredients").where({ user_id });
    const dishesWithIngredients = dishes.map((dish) => {
      const dishIngredients = userIngredient.filter(
        (ingredient) => ingredient.dish_id === dish.id
      );
      return {
        ...dish,
        ingredients: dishIngredients,
      };
    });
    if (dishes.length > 0) {
      return response.json(dishesWithIngredients);
    } else {
      response.status(404).send("Nenhum prato encontrado.");
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { title, image, category, description, price, ingredients } =
      request.body;
    const database = await sqliteConnection();

    const dish = await database.get("select * from dishes where id = ?", [id]);

    if (!dish) {
      throw new AppError("Prato não encontrado");
    }

    dish.title = title ?? dish.title;
    dish.image = image ?? dish.image;
    dish.category = category ?? dish.category;
    dish.description = description ?? dish.description;
    dish.price = price ?? dish.price;

    await database.run(
      `update dishes set 
        title = ?,
        image = ?,
        description = ?,
        category = ?,
        price = ?,
        update_at = datetime('now') 
        where id = ?
        `,
      [dish.title, dish.image, dish.description, dish.category, dish.price, id]
    );
    // Delete existing ingredients for the dish
    const up = await database.run("delete from ingredients where dish_id = ?", [id]);
    console.log(up);

    // Insert new ingredients for the dish
    for (const ingredient of ingredients) {
      await database.run(
        "insert into ingredients (name, dish_id) values (?, ?)",
        [ingredient, id]
      );
    }

    return response.json();
  }
}

module.exports = DishesController;
