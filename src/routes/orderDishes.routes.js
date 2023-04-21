const {Router} = require('express');
const OrderDishesController = require('../controllers/OrderDishesController');

const orderDishes = Router();

const orderDishesController = new OrderDishesController();

orderDishes.get('/orderDishes', orderDishesController.index);
orderDishes.get('/orderDishes/:id', orderDishesController.show);
orderDishes.post('/orderDishes', orderDishesController.create);
orderDishes.put('/orderDishes/:id', orderDishesController.update);
orderDishes.delete('/orderDishes/:id', orderDishesController.delete);

module.exports = orderDishes;
