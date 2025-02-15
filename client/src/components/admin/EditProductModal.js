import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  TextArea,
} from "semantic-ui-react";

const EditProductModal = ({ open, setOpen, product, categories }) => {
  const [category, setCategory] = useState(product?.category?.name);
  const [name, setName] = useState(product?.name);
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.price);
  const [quantity, setQuantity] = useState(product?.quantity);
  const [shipping, setShipping] = useState(product?.shipping);

  // const navigate = useNavigate();

  const getCategoryOptions = () => {
    return categories.map((c) => ({
      key: c._id,
      text: c.name,
      value: c.name,
    }));
  };

  const handleEdit = async () => {
    try {
      const { data } = await axios.put(
        `/api/v1/product/update-product/${product._id}`,
        {
          name,
          category: categories.find((c) => c.name === category)._id,
          description,
          quantity,
          price,
          shipping,
        }
      );
      if (data.success) {
        // navigate("/dashboard/admin/products");
        toast.success("Product updated successfully");
      }
    } catch (error) {
    } finally {
      setOpen(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      size="tiny"
      dimmer="blurring"
    >
      <Modal.Header>Update Product</Modal.Header>
      <Modal.Content
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Form>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Field>
              <label htmlFor="category">Category</label>
              <Select
                id="category"
                placeholder="Select a category"
                value={category}
                options={getCategoryOptions()}
                onChange={(e) => setCategory(e.target.textContent)}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Field>
          </div>
          <Form.Field>
            <label htmlFor="description">Description</label>
            <TextArea
              id="description"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Field>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Field>
              <label htmlFor="price">Price</label>
              <Input
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
              <Input
                type="number"
                id="quantity"
                placeholder="Enter quantity Number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Form.Field>
          </div>
          <Form.Field>
            <label htmlFor="shipping">Shipping</label>
            <Radio
              toggle
              checked={shipping}
              onClick={(e) => setShipping(!shipping)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button positive onClick={handleEdit}>
          Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditProductModal;