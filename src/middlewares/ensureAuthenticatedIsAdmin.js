const knex = require("../database/knex");
const AppError = require("../utils/AppError");

async function ensureAuthenticatedIsAdmin(request, response, next) {
  console.log(request.user); // verifique se a propriedade 'id' está definida corretamente
  const user_id = request.user.id;
  

  const user = await knex("users").where({ id: user_id }).first();

  if (!user.isAdmin) {
    throw new AppError("Usuário não está autorizado", 401);
  }

  next();
}

module.exports = ensureAuthenticatedIsAdmin;