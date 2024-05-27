import React, { useState } from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { Delete } from "@mui/icons-material";
import { useDeleteSiteMutation } from "../../../../redux/site/SiteApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DeleteButton = ({ entityId, deleteEntity, deleteState }) => {

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEntity(entityId).unwrap();
      toast.success("Deleted successfully");
      setIsDeleting(false);
      setShowConfirmation(false);
      // dispatch(deleteState(entityId));
      window.history.back();
    } catch (error) {
      console.error("Failed to delete:", error);
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
        className="bg-red-500 hover:bg-red-600 text-xs text-white font-medium md:py-1 h-fit md:h-full p-3 md:px-2 rounded-lg inline-flex items-center" 
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

