const createUsers = `
  create table if not exists users(
    id integer primary key autoincrement,
    name varchar not null,
    email varchar not null,
    password varchar not null,
    isAdmin boolean default 0,
    created_at timestamp default current_timestamp
  )
`;

module.exports = createUsers;