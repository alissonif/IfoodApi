exports.up = function(knex) {
  return knex.schema.table('dishes', function(table) {
    table.dropForeign('user_id');
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.table('dishes', function(table) {
    table.dropForeign('user_id');
    table.foreign('user_id').references('users.id');
  });
};
