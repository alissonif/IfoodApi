const { Router } = require("express");

const UserController = require("../controller/UserController");

const usersRoutes = Router();

/*function myMiddleware(request, response, next) {
  console.log("Middleware");
  console.log(request.body);
  if (!request.body.isAdmin) {
    return response.json({ message: "user unauthorized" });
  }
  next();
}
*/
const userController = new UserController();

usersRoutes.post("/", userController.create);
 

module.exports = usersRoutes;
