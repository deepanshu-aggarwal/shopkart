import React from "react";
import "./pagination.css";
import { Pagination } from "semantic-ui-react";
import { CONSTANTS } from "../utils/constants";

const CustomPagination = ({ page, setPage, total }) => {
  const totalPages = Math.ceil(total / CONSTANTS.NUM_OF_PRODUCTS);

  const handlePageChange = (e) => setPage(e.target.text);

  return (
    <div className="paginationContainer">
      <Pagination
        firstItem={null}
        lastItem={null}
        activePage={page}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default CustomPagination;
