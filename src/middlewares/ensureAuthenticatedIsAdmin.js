const knex = require("../database/knex");
const AppError = require("../utils/AppError");

async function ensureAuthenticatedIsAdmin(request, response, next) {
  const user_id = request.user.id;
  const user = await knex("users").where({ id: user_id }).first();

  if (!user.isAdmin) {
    throw new AppError("Usuário não é admin", 401);
  }

  return next();
}

module.exports = ensureAuthenticatedIsAdmin;
