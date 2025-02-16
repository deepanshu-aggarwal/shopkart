import slugify from "slugify";
import Product from "../models/productModel.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import Category from "../models/categoryModel.js";
import Order from "../models/orderModel.js";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    if (!name) {
      res.status(400).send({ success: false, message: "Name is missing" });
      return;
    } else if (!description) {
      res
        .status(400)
        .send({ success: false, message: "Description is missing" });
      return;
    } else if (!price) {
      res.status(400).send({ success: false, message: "Price is missing" });
      return;
    } else if (!category) {
      res.status(400).send({ success: false, message: "Category is missing" });
      return;
    } else if (!quantity) {
      res.status(400).send({ success: false, message: "Quantity is missing" });
      return;
    }

    const data = {
      name,
      slug: slugify(name),
      description,
      price,
      category,
      quantity,
      shipping,
    };

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const product = await new Product(data);

    await cloudinary.uploader.upload(photo.path, (error, res) => {
      if (res) {
        product.photo = res?.url;
        product.save();
      } else {
        res.status(400).send({
          success: false,
          message: "Error in uploading image",
        });
        return;
      }
    });

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Something went wrong", error });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, photo, shipping } =
      req.body;
    const { id } = req.params;

    if (!name) {
      res.status(400).send({ success: false, message: "Name is missing" });
      return;
    } else if (!description) {
      res
        .status(400)
        .send({ success: false, message: "Description is missing" });
      return;
    } else if (!price) {
      res.status(400).send({ success: false, message: "Price is missing" });
      return;
    } else if (!category) {
      res.status(400).send({ success: false, message: "Category is missing" });
      return;
    } else if (!quantity) {
      res.status(400).send({ success: false, message: "Quantity is missing" });
      return;
    }

    const data = {
      name: name,
      slug: slugify(name),
      description: description,
      price: price,
      category: category,
      quantity: quantity,
      photo: photo,
    };

    const product = await Product.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

export const productController = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(10)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Fetched all products",
      total: products.length,
      products,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

export const singleProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");
    res.status(200).send({
      success: true,
      message: "Fetched the product",
      product,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

export const filteredProductsController = async (req, res) => {
  try {
    const { categories, price } = req.body;
    console.log(categories, price);
    const query = {};
    if (categories.length > 0) query.category = categories;
    if (price) query.price = { $gt: price[0], $lte: price[1] };

    const products = await Product.find(query).populate("category");
    res
      .status(200)
      .send({ success: true, message: "Filtered products", products });
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

export const productListController = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const products = await Product.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("category")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .send({ success: true, message: `Products for page ${page}`, products });
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

export const totalProductsCount = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const total = await Product.find({}).estimatedDocumentCount();

    res.status(200).send({ success: true, message: "Total products", total });
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;

    const query = { name: { $regex: keyword, $options: "i" } };
    const products = await Product.find(query).populate("category");

    res
      .status(200)
      .send({ success: true, message: "Searched Result", products });
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

// get products of single category
export const categoryProductsController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug: { $eq: slug } });
    const products = await Product.find({
      category: { $eq: category._id },
    }).populate("category");
    res
      .status(200)
      .send({ success: true, message: "Fetched products", products, category });
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

// payment gateway
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) res.status(500).send({ success: false, err });
      res.status(200).send({
        success: true,
        message: "Payment token generated",
        token: response,
      });
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    const total = cart.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);

    let transaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      (error, result) => {
        if (error) {
          res
            .status(500)
            .send({ success: false, message: "Something went wrong", error });
          return;
        }

        const order = Order.create({
          products: cart,
          payment: result,
          buyer: req.user._id,
        });

        res
          .status(201)
          .send({ success: true, message: "Order placed successfully", order });
      }
    );
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};
