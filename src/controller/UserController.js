const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExixts = await database.get(
      "select * from users where email= (?)",
      [email]
    );

    if (checkUserExixts) {
      throw new AppError("Este email já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "insert into users (name, email, password) values(?, ?, ?)",
      [name, email, hashedPassword]
    );
    return response.status(201).json();
  }


}
module.exports = UserController;
