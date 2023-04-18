const path = require('path');
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.relative(__dirname, ' ', "database", "database.db")
    },
    useNullAsDefault: true
  }
};