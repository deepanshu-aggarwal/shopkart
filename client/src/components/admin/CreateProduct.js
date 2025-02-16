import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Dropdown, Form } from "semantic-ui-react";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState();

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-all-categories");
      if (data?.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something got wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const product = new FormData();
      product.append("name", name);
      product.append("description", description);
      product.append(
        "category",
        categories.find((c) => c.name === category)._id
      );
      product.append("price", price);
      product.append("quantity", quantity);
      product.append("photo", photo);
      product.append("shipping", shipping);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        product
      );
      if (data?.success) {
        toast.success("Product added successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something got wrong");
    }
  };

  const getCategoryOptions = () => {
    return categories.map((c) => ({
      key: c._id,
      text: c.name,
      value: c.name,
    }));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Manage Product</h1>
      <div>
        <Dropdown
          search
          selection
          placeholder="Select a category"
          options={getCategoryOptions()}
          onChange={(e) => setCategory(e.target.textContent)}
        />
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                id="description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                placeholder="Enter quantity Number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="photo">Select Photo</label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setPhoto(e.target.files[0]);
                }}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="shipping">Shipping</label>
              <Form.Radio
                toggle
                value={shipping}
                onClick={(e) => setShipping(!shipping)}
              />
            </Form.Field>
            <Form.Button
              type="submit"
              primary
              disabled={
                !name ||
                !description ||
                !quantity ||
                !price ||
                !category ||
                !photo
              }
            >
              Create
            </Form.Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
