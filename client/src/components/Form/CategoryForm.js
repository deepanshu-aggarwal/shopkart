import React from "react";
import { Form } from "semantic-ui-react";

const CategoryForm = ({ value, setValue, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label htmlFor="category">New Category</label>
        <Form.Input
          type="text"
          id="category"
          placeholder="Enter new category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Field>
      <Form.Button primary type="submit" disabled={!value}>
        Submit
      </Form.Button>
    </Form>
  );
};

export default CategoryForm;
