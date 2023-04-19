
exports.up = knex => knex.schema.createTable('ingredients', table=>{
  table.increments('id');
  table.text('name').notNullable();
  table.integer('dish_id').references('id').inTable('dishes').onDelete('cascade').notNullable();
});

exports.down = knex => knex.schema.dropTable('ingredients', table=>{

});
