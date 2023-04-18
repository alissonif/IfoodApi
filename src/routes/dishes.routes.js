const { Router } = require("express");

const OrderController = require("../controller/OrderController");

const orderRoutes = Router();

/*function myMiddleware(request, response, next) {
  console.log("Middleware");
  console.log(request.body);
  if (!request.body.isAdmin) {
    return response.json({ message: "user unauthorized" });
  }
  next();
}
*/
const orderController = new OrderController();

orderRoutes.put("/", orderController.create);
orderRoutes.put("/", orderController.delete);
orderRoutes.put("/", orderController.show);
orderRoutes.put("/:id", orderController.index);
orderRoutes.put("/:id", orderController.update);

module.exports = orderRoutes;
