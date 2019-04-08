import * as express from "express";
import { ordersController } from "../../controllers/";

const ordersRouter = express.Router();

ordersRouter.get("/", ordersController.getAll);
ordersRouter.post("/", ordersController.createOrder);
ordersRouter.put("/:id", ordersController.updateOrderById);
ordersRouter.post("/:id/cancel", ordersController.cancelOrderById);

export { ordersRouter };