const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

const database = require("../database/knex");

class OrdersController {
  async create(request, response) {
    const { user_id, status, details } = request.body;
    const created_at = new Date();
    const update_at = new Date();

    const [id] = await database("orders").insert({
      user_id,
      status,
      details,
      created_at,
      update_at,
    });

    const order = await database("orders").where({ id }).first();

    return response.json(order);
  }

  async update(request, response) {
    const { id } = request.params;
    const { status, details } = request.body;
    const update_at = new Date();

    const order = await database("orders").where({ id }).first();
    if (!order) {
      return response.status(404).json({ error: "Order not found" });
    }

    await database("orders")
      .where({ id })
      .update({ status, details, update_at });

    const updatedOrder = await database("orders").where({ id }).first();

    return response.json(updatedOrder);
  }
  async index(request, response) {
    const orders = await database("orders").select("*");
    return response.json(orders);
  }

/*   async show(request, response) {
    const { id } = request.params;
    const order = await database("orders").where({ id }).first();
    if (!order) {
      return response.status(404).json({ error: "Order not found" });
    }
    return response.json(order);
  }

  async delete(request, response) {
    const { id } = request.params;

    const order = await database("orders").where({ id }).first();
    if (!order) {
      return response.status(404).json({ error: "Order not found" });
    }

    await database("orders").where({ id }).delete();

    return response.status(204).send();
  } */
}

module.exports = OrdersController;
