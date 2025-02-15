import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import EditProductModal from "./EditProductModal";
import useCategory from "../../hooks/useCategory";
import { Button, Card, Image, Loader, Modal } from "semantic-ui-react";
import CustomPagination from "../Pagination";
import { CONSTANTS } from "../../utils/constants";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [pId, setPId] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const GetCategory = async () => {
    const data = await useCategory();
    setCategories(data);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/v1/product/get-all-products");
      setProducts(data.products);
    } catch (error) {
      console.log("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetCategory();
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${pId}`
      );
      if (data?.success) {
        const filteredProducts = products.filter(p => p._id!==pId);
        setProducts(filteredProducts);
        toast.success("Product deleted successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpenDelete(false);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setOpenEdit(true);
  };

  return (
    <div>
      <h1>All Products</h1>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <>
          <Card.Group>
            {products &&
              products
                .slice(
                  (page - 1) * CONSTANTS.NUM_OF_PRODUCTS,
                  page * CONSTANTS.NUM_OF_PRODUCTS
                )
                .map((product, index) => (
                  <Card
                    style={{
                      width: 240,
                    }}
                  >
                    <Card.Content>
                      <Image
                        alt={product?.name}
                        src={product?.photo}
                        style={{
                          height: "250px",
                          width: "200px",
                          marginTop: "10px",
                          objectFit: "contain",
                        }}
                      />
                      <Card.Header>{product?.name}</Card.Header>
                      <Card.Description style={{ marginBottom: "10px" }}>
                        {`${product?.description?.substring(0, 100)} ...`}
                      </Card.Description>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          fontWeight: 600,
                          fontSize: "16px",
                        }}
                      >
                        Price: ₹ {product?.price}
                      </div>
                    </Card.Content>
                    <Card.Content extra style={{display:'flex'}}>
                      <Button
                        onClick={() => {
                          handleEdit(product);
                        }}
                        primary
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          setOpenDelete(true);
                          setPId(product._id);
                        }}
                        style={{ marginLeft: "auto" }}
                        secondary
                      >
                        Delete
                      </Button>
                    </Card.Content>
                  </Card>
                ))}
          </Card.Group>
          <CustomPagination
            page={page}
            setPage={setPage}
            total={products.length}
          />
        </>
      )}
      <Modal size="tiny" open={openDelete} onClose={() => setOpenDelete(false)}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure to delete the product?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpenDelete(false)}>
            Cancel
          </Button>
          <Button positive onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
      {editProduct && (
        <EditProductModal
          key={editProduct._id}
          open={openEdit}
          setOpen={setOpenEdit}
          categories={categories}
          product={editProduct}
        />
      )}
    </div>
  );
};

export default Products;
