
exports.up = knex => knex.schema.createTable('orderDishes', table=>{
  table.increments('id');
  table.float('quantity').notNullable();
  table.integer('order_id').references('id').inTable('orders').onDelete('cascade').notNullable();
  table.integer('dish_id').references('id').inTable('dishes').onDelete('cascade').notNullable();

});

exports.down = knex => knex.schema.dropTable('dishes', table=>{

});
