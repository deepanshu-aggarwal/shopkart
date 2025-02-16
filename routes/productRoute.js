import express from "express";
import {
  createProductController,
  deleteProductController,
  filteredProductsController,
  productController,
  productListController,
  searchProductController,
  singleProductController,
  totalProductsCount,
  updateProductController,
  categoryProductsController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controllers/productController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

// create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  updateProductController
);

// get all products
router.get("/get-all-products", productController);

// single product
router.get("/get-product/:id", singleProductController);

// delete product
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

// filtered products
router.post("/filter-products", filteredProductsController);

// list of products according to pages
router.get("/product-list", productListController);

// total count of all products
router.get("/total-count", totalProductsCount);

// search product
router.get("/search/:keyword", searchProductController);

router.get("/category-products/:slug", categoryProductsController);

// payments route
// token
router.get("/braintree/token", braintreeTokenController);

// payment
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
