import React, { useEffect, useState } from "react";
import axios from "axios";
import { prices } from "../utils/prices";
import CustomPagination from "../components/Pagination";
import ProductFilter from "../components/ProductFilter";
import Products from "../components/Products";
import { Icon, Input, Loader } from "semantic-ui-react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-all-categories");
      if (data?.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  // const getTotal = async () => {
  //   const { data } = await axios.get("/api/v1/product/total-count");
  //   setTotal(data.total);
  // };

  const fetchList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/v1/product/get-all-products");
      if (data.success) {
        setProducts(data.products);
        setTotal(data.products.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth.token) navigate("/login");
    fetchCategories();
    fetchList();
  }, []);

  const fetchFiltered = async () => {
    const { data } = await axios.post("/api/v1/product/filter-products", {
      categories: checked,
      price: radio,
    });
    if (data.success) {
      setProducts(data.products);
      setTotal(data.products.length);
    }
  };

  const searchFilter = () => {
    if (radio || checked.length > 0) fetchFiltered();
  };

  const resetFilter = () => {
    window.location.reload();
  };

  const handleCategoryFilter = (id) => {
    let category = [...checked];
    if (category.includes(id)) category = category.filter((c) => c !== id);
    else category.push(id);
    setChecked(category);
  };

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/search/${search}`);
      if (data.success) {
        setProducts(data.products);
        setTotal(data.products.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSearch("");
    }
  };

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <ProductFilter
        categories={categories}
        prices={prices}
        handleCategoryFilter={handleCategoryFilter}
        radio={radio}
        setRadio={setRadio}
        searchFilter={searchFilter}
        resetFilter={resetFilter}
      />
      <div style={{ width: "100%" }}>
        <h1>All Products</h1>
        <Input
          icon={
            <Icon name="search" onClick={handleSearch} inverted circular link />
          }
          placeholder="Search product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        {loading ? (
          <div>
            <Loader active inline="centered" />
          </div>
        ) : products?.length ? (
          <>
            <Products page={page} products={products} />
            <CustomPagination page={page} setPage={setPage} total={total} />
          </>
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              color: "lightgray",
            }}
          >
            <Icon name="inbox" />
            <div>No data</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
