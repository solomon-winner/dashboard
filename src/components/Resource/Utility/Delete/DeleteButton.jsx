import React, { useState } from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { Delete } from "@mui/icons-material";

const DeleteButton = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    // Here you would call the delete function
    // For example: await deleteResource();
    console.log("Deleting...");
    setIsDeleting(false);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-sm text-white font-semibold py-1 px-2 rounded-lg inline-flex items-center" 
      >
        <Delete fontSize="small" className="mr-1" /> 
        <span>Delete</span>
      </button>
      <DeleteConfirmationDialog
        showConfirmation={showConfirmation}
        handleConfirmDelete={handleConfirmDelete}
        handleCancelDelete={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default DeleteButton;
