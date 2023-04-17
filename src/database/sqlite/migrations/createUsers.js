const createUsers = `
  create table if not exists users(
    id integer primary key autoincrement,
    name varchar,
    email varchar,
    password varchar,
    isAdmin boolean,
    created_at timestamp default current_timestamp
  )
`;

module.exports = createUsers;