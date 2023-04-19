
exports.up = knex => knex.schema.createTable('favorites', table=>{
  table.increments('id');
  table.integer('dish_id').references('id').inTable('dishes').onDelete('cascade').notNullable();
  table.integer('user_id').references('id').inTable('users').onDelete('cascade').notNullable();

});

exports.down = knex => knex.schema.dropTable('favorites', table=>{

});

