const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UserController {
  async create(request, response) {
    const { name, email, password, isAdmin } = request.body;
    
    const database = await sqliteConnection();
    const checkUserExists = await database.get(
      "select * from users where email= (?)",
      [email]
    );

    if (checkUserExists) {
      throw new AppError("Este email já está em uso.");
    }
  /*   if(!checkUserExists){
      console.log("Usuario criado com sucesso.");
    }
 */
    const hashedPassword = await hash(password, 8);

    await database.run(
      "insert into users (name, email, password, isAdmin) values(?, ?, ?, ?)",
      [name, email, hashedPassword, isAdmin ? true : false]
    );
    return response.status(201).json({ message: "Usuário criado com sucesso." });
  }


}
module.exports = UserController;
