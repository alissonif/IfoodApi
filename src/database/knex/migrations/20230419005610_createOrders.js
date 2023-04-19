
exports.up = knex => knex.schema.createTable('orders', table=>{
  table.increments('id');
  table.text('status');
  table.text('details').notNullable();
  table.integer('user_id').references('id').inTable('users').onDelete('cascade').notNullable();
  table.timestamp('created_at').default(knex.fn.now());
  table.timestamp('update_at').default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('orders', table=>{

});
