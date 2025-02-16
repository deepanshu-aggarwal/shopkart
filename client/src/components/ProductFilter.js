import React from "react";
import { Button, Checkbox, Radio } from "semantic-ui-react";

const ProductFilter = ({
  categories,
  prices,
  handleCategoryFilter,
  radio,
  setRadio,
  searchFilter,
  resetFilter,
}) => {
  return (
    <div style={{ width: "300px", position: "sticky", top: "20px" }}>
      {/* Category Filter */}
      <h4>Filter by category</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {categories &&
          categories.map((category, index) => (
            <Checkbox
              key={category._id}
              label={category.name}
              value={category._id}
              onChange={(e, { value }) => handleCategoryFilter(value)}
            />
          ))}
      </div>
      {/* Price Filter */}
      <h4 className="text-center mt-4">Filter by price</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {prices.map((price) => (
          <Radio
            key={price.id}
            name="price_filter"
            value={price.range}
            label={price.label}
            checked={radio === price.range}
            onChange={(e, { value }) => setRadio(value)}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          marginTop: "20px",
        }}
      >
        <Button primary onClick={searchFilter}>
          Filter
        </Button>
        <Button secondary onClick={resetFilter}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
