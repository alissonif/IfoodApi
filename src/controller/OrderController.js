const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class OrderController {
  async create(request, response) {}
  async show(request, response) {}
  async delete(request, response) {}
  async index(request, response) {}
  async update(request, response) {}
}
/* async update(request, response) {
  const { name, email } = request.body;
  const { id } = request.params;
  const database = await sqliteConnection();
  const user = await database.get("select * from users where id = ?", [id]);

  if (!user) {
    throw new AppError("usuário não encontrado");
  }

  const userWithUpdatedEmail = await database.get(
    "select * from users where email = ?",
    [email]
  );

  if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
    throw new AppError("este email já esta em uso");
  }

  user.name = name ?? user.name;
  user.email = email ?? user.email;

  await database.run(
    `update users set 
  name = ?,
  email = ?,
  created_at = datetime('now') //updated_at
  where id = ?`,
    [user.name, user.email, new Date(), id]
  );

  return response.json();
} */

module.exports = OrderController;