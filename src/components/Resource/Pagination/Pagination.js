// Pagination.jsx
import { KeyboardDoubleArrowLeft } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="flex justify-center items-center mt-8">
      <button
        onClick={() => handlePageChange(1)}
        className={`mx-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm  flex items-center ${currentPage === 1 ? 'bg-gray-400 text-white cursor-not-allowed' : ''}`}
        disabled={currentPage === 1}
      >
        <KeyboardDoubleArrowLeft  />
      </button>
      {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
        const startPage = Math.max(0, currentPage - 4);
        const endPage = Math.min(totalPages, startPage + 9);
        const pageNumber = startPage + index;

        if (pageNumber >= startPage && pageNumber < endPage) {
          return (
            <button
              key={index}
              onClick={() => handlePageChange(pageNumber + 1)}
              className={`mx-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50  ${
                currentPage === pageNumber + 1
                  ? "bg-green-600 text-white border-2 border-green-700"
                  : ""
              }`}
              disabled={pageNumber + 1 > totalPages}
            >
              {pageNumber + 1}
            </button>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default Pagination;
