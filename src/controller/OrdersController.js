const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class OrdersController {
  //o create->fazer: Verificar se já existe um item de pedido para este prato e este pedido;Se já existe, soma as quantidades
  async create(request, response) {
    const { payment, orders } = request.body;
    const user_id = request.user.id;

    // for (let order of orders) {
    //   const { id, title, quantity } = order;
    //   // Verifica se o dish com o id e o title informados existe
    //   const dish = await knex("dishes")
    //     .where("id", id)
    //     .andWhere("title", title)
    //     .first();
    //   if (!dish) {
    //     throw new AppError(
    //       `Dish com id ${id} e título ${title} não encontrado.`
    //     );
    //   }

    //   // Verifica se já existe um item de pedido para este prato e este pedido
    //   const existingOrderItem = await knex("orderItems")
    //     .where({ dish_id: id, title })
    //     .first();
    //   console.log(existingOrderItem);

    //   if (existingOrderItem) {
    //     // Se já existe, soma as quantidades
    //     await knex("orderItems")
    //       .where({ dish_id: id, title })
    //       .increment("quantity", quantity);
    //     console.log(quantity);
    //   }
    // }

    const [order_id] = await knex("orders")
      .insert({
        payment,
        user_id,
      })
      .returning("id");

    // Se não existe, insere um novo item de pedido
    const ordersInsert = orders.map((order) => {
      return {
        title: order.title,
        quantity: order.quantity,
        order_id: order_id.id,
        dish_id: order.id,
      };
    });
    await knex("orderItems").insert(ordersInsert);

    return response.status(201).json(ordersInsert);
  }

  async show(request, response) {
    const { id } = request.params;

    const orders = await knex("orders").where({ id }).first();
    const orderItems = await knex("orderItems").where({ order_id: id });

    return response.status(201).json({
      ...orders,
      orderItems,
    });
  }

  async update(request, response) {
    const { id, status } = request.body;

    await knex("orders").update({ status }).where({ id });

    return response.status(201).json();
  }

  async index(request, response) {
    const orders = await knex("orders");
    const orderItems = await knex("orderItems");

    const cartWithOrders = orders.map((cart) => {
      const Order = orderItems.filter((order) => order.order_id === cart.id);

      return {
        ...cart,
        orders: Order,
      };
    });
    return response.status(201).json(cartWithOrders);
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("orders").where({ user_id: id }).delete();

    return response.status(201).json();
  }
}

module.exports = OrdersController;
