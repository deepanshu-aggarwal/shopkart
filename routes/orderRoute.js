import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  getAllOrdersController,
  getOrdersController,
  updateOrderStatusController,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/get-orders", requireSignIn, getOrdersController);
router.get("/get-all-orders", requireSignIn, isAdmin, getAllOrdersController);
router.post(
  "/update-order-status/:orderId",
  requireSignIn,
  isAdmin,
  updateOrderStatusController
);

export default router;
