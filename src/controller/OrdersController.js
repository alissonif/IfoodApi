const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class OrdersController {
  //o create->fazer: Verificar se já existe um item de pedido para este prato e este pedido;Se já existe, soma as quantidades
  async create(request, response) {
    const { payment, orders } = request.body;
    const user_id = request.user.id;

    for (let order of orders) {
      const { id, title, quantity } = order;
      // Verifica se o dish com o id e o title informados existe
      const dish = await knex("dishes")
        .where("id", id)
        .andWhere("title", title)
        .first();
      if (!dish) {
        throw new AppError(
          `Dish com id ${id} e título ${title} não encontrado.`
        );
      }
    }
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

  async index(request, response) {
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (user.isAdmin === 1) {
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
    } else {
      const orders = await knex("orders").where({ user_id });
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
  }

  // async index(request, response) {
  //   const orders = await knex("orders");
  //   const orderItems = await knex("orderItems");

  //   const cartWithOrders = orders.map((cart) => {
  //     const Order = orderItems.filter((order) => order.order_id === cart.id);

  //     return {
  //       ...cart,
  //       orders: Order,
  //     };
  //   });
  //   return response.status(201).json(cartWithOrders);
  // }

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
    const { id } = request.params;
    const { status } = request.body;

    const order = await knex("orders").where({ id }).first();
    if (!order) {
      throw new AppError(`Pedido com ID ${id} não encontrado.`, 404);
    }

    const updateStatus=await knex("orders")
      .update({ status, updated_at: knex.fn.now() })
      .where({ id });

      return response.json({
        message: "Status atualizado com sucesso.",
        status: updateStatus,
      });
  }

  async deleteIndex(request, response) {
    const { id } = request.params;

    const order = await knex("orders").where({ user_id: id }).delete();

    if (!order) {
      throw new AppError(`Pedido com ID ${id} não encontrado.`, 404);
    }

    return response.json({
      message: `Todos Pedidos desse ID ${id} excluídos com sucesso.`,
      order
    });
  }

  async deleteShow(request, response) {
    const { id } = request.params;

    const order = await knex("orders").where({ id }).first();
    if (!order) {
      throw new AppError(`Pedido com ID ${id} não encontrado.`, 404);
    }

    const deleteOrder = await knex("orders").where({ id }).delete();

    return response.json({
      message: "Pedido excluído com sucesso.",
      orders: deleteOrder,
    });
  }
}

module.exports = OrdersController;
