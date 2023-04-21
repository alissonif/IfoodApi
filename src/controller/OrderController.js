const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

const database = require('../database');

class OrdersController {
  async index(req, res) {
    const orders = await database('orders').select('*');
    return res.json(orders);
  }

  async show(req, res) {
    const { id } = req.params;
    const order = await database('orders').where({ id }).first();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.json(order);
  }

  async create(req, res) {
    const { id_user, status, details } = req.body;
    const created_at = new Date();
    const update_at = new Date();

    const [id] = await database('orders').insert({
      id_user,
      status,
      details,
      created_at,
      update_at,
    });

    const order = await database('orders').where({ id }).first();

    return res.json(order);
  }

  async update(req, res) {
    const { id } = req.params;
    const { status, details } = req.body;
    const update_at = new Date();

    const order = await database('orders').where({ id }).first();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await database('orders').where({ id }).update({ status, details, update_at });

    const updatedOrder = await database('orders').where({ id }).first();

    return res.json(updatedOrder);
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await database('orders').where({ id }).first();
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await database('orders').where({ id }).delete();

    return res.status(204).send();
  }
}

module.exports = OrdersController;
