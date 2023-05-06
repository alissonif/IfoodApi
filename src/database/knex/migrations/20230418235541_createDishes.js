
exports.up = knex => knex.schema.createTable('dishes', table=>{
  table.increments('id');
  table.text('title').notNullable();
  table.text('image');
  table.text('description');
  table.text('category').notNullable();
  table.float('price').notNullable();
  table.integer('user_id').references('id').inTable('users').onDelete('cascade').notNullable();
  table.timestamp('created_at').default(knex.fn.now());
  table.timestamp('updated_at').default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('dishes', table=>{

});
