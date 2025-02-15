import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./category.css";
import CategoryForm from "../../components/Form/CategoryForm";
import { Button, Modal, Table } from "semantic-ui-react";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-all-categories");
      if (data.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something got wrong");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name: newCategory,
      });
      if (data?.success) {
        toast.success("Category added successfully");
        setNewCategory("");
        fetchCategories();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something got wrong");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const id = selected?._id;
      const { data } = await axios.put(
        `/api/v1/category/update-category/${id}`,
        {
          updatedName,
        }
      );
      if (data?.success) {
        toast.success(data.message);
        fetchCategories();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something got wrong");
    } finally {
      setSelected(null);
      setUpdatedName("");
      setVisible(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      if (data?.success) {
        fetchCategories();
        setOpenDelete(false);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something got wrong");
    }
  };

  return (
    <div style={{ width: "50%" }}>
      <h1>Manage Category</h1>
      <CategoryForm
        value={newCategory}
        setValue={setNewCategory}
        handleSubmit={handleFormSubmit}
      />
      <Table style={{ marginTop: "30px" }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">Name</Table.HeaderCell>
            <Table.HeaderCell scope="col">Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {categories?.map((category, index) => (
            <Table.Row key={index}>
              <Table.Cell>{category.name}</Table.Cell>
              <Table.Cell>
                <Button
                  secondary
                  onClick={() => {
                    setVisible(true);
                    setUpdatedName(category.name);
                    setSelected(category);
                  }}
                >
                  Edit
                </Button>
                <Button
                  negative
                  onClick={() => {
                    setOpenDelete(true);
                    setSelectedCategory(category);
                  }}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Modal
        onClose={() => setVisible(false)}
        open={visible}
        dimmer="blurring"
        size="tiny"
      >
        <Modal.Content>
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleEdit}
          />
        </Modal.Content>
      </Modal>
      <Modal size="tiny" open={openDelete} onClose={() => setOpenDelete(false)}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure to delete the product?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpenDelete(false)}>
            Cancel
          </Button>
          <Button positive onClick={() => handleDelete(selectedCategory._id)}>
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default CreateCategory;
