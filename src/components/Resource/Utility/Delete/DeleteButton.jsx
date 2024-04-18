import React, { useState } from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { Delete } from "@mui/icons-material";
import { useDeleteSiteMutation } from "../../../../redux/site/SiteApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteButton = ({ entityId, deleteEntity }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEntity(entityId).unwrap();
      toast.success("Site deleted successfully");
      setIsDeleting(false);
      setShowConfirmation(false);
      navigate(-1);
    } catch (error) {
      console.error("Failed to delete site:", error);
      setIsDeleting(false);
    }
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
