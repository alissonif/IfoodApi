const createDishes = `
  create table if not exists dishes(
    id integer primary key autoincrement,
    id_user
    name varchar,
    avatar varchar
    category varchar
    description text
    price float
    create_at timestamp default current_timestamp
    update_at timestamp default current_timestamp
      )
`;

module.exports = createDishes;