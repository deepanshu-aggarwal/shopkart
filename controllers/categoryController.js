import slugify from "slugify";
import Category from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      res.status(400).send({ success: false, message: "Name is required" });

    const existingCategory = await Category.findOne({ name });
    if (existingCategory){
      res.status(200).send({ success: false, message: "Category already exists" });
      return;
    }

    const createdCategory = await Category.create({
      name: name,
      slug: slugify(name),
    });

    res.status(201).send({
      success: true,
      message: "Category created successfully",
      createdCategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error to create category",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { updatedName } = req.body;
    const { id } = req.params;

    if (!updatedName){
      res.status(400).send({ success: false, message: "Updated name is required" });
      return;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name: updatedName,
        slug: slugify(updatedName),
      },
      { new: true }
    );

    res
      .status(200)
      .send({ success: true, message: "Category updated", updatedCategory });
  } catch (error) {
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

export const categoryController = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).send({
      success: true,
      message: "All category",
      total: category.length,
      category,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Something went wrong", error });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });

    if (!category){
      res.status(404).send({ success: false, message: "Category not found" });
      return;
    }

    res
      .status(200)
      .send({ success: true, message: "Category found", category });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Something went wrong", error });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id){
      res.status(400).send({ success: false, message: "Id is missing" });
      return;
    }

    const category = await Category.findById(id);
    if (!category){
      res.status(400).send({ success: false, message: "Category not present" });
      return;
    }

    await Category.findByIdAndDelete(id);
    res
      .status(200)
      .send({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Something went wrong", error });
  }
};
