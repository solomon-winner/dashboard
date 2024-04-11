import React from 'react';

const DeleteConfirmationDialog = ({ showConfirmation, handleConfirmDelete, handleCancelDelete, isDeleting }) => {
 if (!showConfirmation) return null;

 return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md">
        <div className="text-2xl text-gray-800 mb-4">Confirmation</div>
        <div className="text-lg text-gray-800 mb-4">Are you sure you want to delete this role?</div>
        <div className="flex justify-end">
          <button
            onClick={handleCancelDelete}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 mr-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
 );
};

export default DeleteConfirmationDialog;