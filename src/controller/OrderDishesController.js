const database = require('../database/knex');

class OrderDishesController {
  async index(req, res) {
    const orderDishes = await database('order_dishes').select('*');
    return res.json(orderDishes);
  }

  async show(req, res) {
    const { id } = req.params;
    const orderDish = await database('order_dishes').where({ id }).first();
    if (!orderDish) {
      return res.status(404).json({ error: 'Order dish not found' });
    }
    return res.json(orderDish);
  }

  async create(req, res) {
    const { id_order, id_dish, quantity } = req.body;

    const [id] = await database('order_dishes').insert({
      id_order,
      id_dish,
      quantity,
    });

    const orderDish = await database('order_dishes').where({ id }).first();

    return res.json(orderDish);
  }

  async update(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;

    const orderDish = await database('order_dishes').where({ id }).first();
    if (!orderDish) {
      return res.status(404).json({ error: 'Order dish not found' });
    }

    await database('order_dishes').where({ id }).update({ quantity });

    const updatedOrderDish = await database('order_dishes').where({ id }).first();

    return res.json(updatedOrderDish);
  }

  async delete(req, res) {
    const { id } = req.params;

    const orderDish = await database('order_dishes').where({ id }).first();
    if (!orderDish) {
      return res.status(404).json({ error: 'Order dish not found' });
    }

    await database('order_dishes').where({ id }).delete();

    return res.status(204).send();
  }
}

module.exports = OrderDishesController;
