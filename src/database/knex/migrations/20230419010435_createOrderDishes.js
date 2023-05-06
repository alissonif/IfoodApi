
exports.up = knex => knex.schema.createTable('orderItems', table=>{
  table.increments('id');
  table.text('title').notNullable();
  table.integer('quantity').notNullable();
  table.integer('order_id').references('id').inTable('orders').onDelete('cascade').notNullable();
  table.integer('dish_id').references('id').inTable('dishes').onDelete('cascade').notNullable();
  table.timestamp("created_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable('orderItems', table=>{

});
