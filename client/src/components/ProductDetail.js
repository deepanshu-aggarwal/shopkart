import React from "react";
import "./productDetail.css";
import { Button, Image, Modal } from "semantic-ui-react";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartProvider";

const ProductDetail = ({ open, setOpen, product }) => {
  const [cart, setCart] = useCart();

  const handleAddToCart = () => {
    if (!cart) return;
    const existingProduct = cart?.find((p) => p._id === product._id);
    const newCart = cart?.filter((p) => p._id !== product._id);
    if (!existingProduct) {
      const newProduct = {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        qty: 1,
        photo: product.photo,
      };
      setCart([...newCart, newProduct]);
      localStorage.setItem("cart", JSON.stringify([...newCart, newProduct]));
      toast.success("Product added to cart");
    } else {
      toast.error("Product already in cart");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <Modal.Header>{product?.name}</Modal.Header>
      <Modal.Content image>
        <Image className="image" src={product?.photo} alt={product?.name} />
        <Modal.Description>
          <p>{product?.description}</p>
          <h3 className="price">Price: ₹{product.price}</h3>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={handleCancel}>
          Close
        </Button>
        <Button
          positive
          labelPosition="right"
          icon="cart"
          content="Add to Cart"
          onClick={handleAddToCart}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ProductDetail;
