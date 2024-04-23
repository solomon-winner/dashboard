import React from "react";

const DeleteConfirmationDialog = ({
  showConfirmation,
  handleConfirmDelete,
  handleCancelDelete,
  isDeleting,
}) => {
  if (!showConfirmation) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-md w-full">
        {" "}
        {/* Decreased the max-w-lg to max-w-md */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Confirm Deletion
          </h2>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancelDelete}
              className="py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded transition duration-150"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className={`py-2 px-4 text-white ${
                isDeleting ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
              } rounded transition duration-150`}
            >
              {isDeleting ? "Deleting..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;

export const DeleteConfirmationWithDetails = ({
  showConfirmation,
  handleConfirmDelete,
  handleCancelDelete,
  isDeleting,
}) => {
  if (!showConfirmation) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-md w-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Confirm Deletion
          </h2>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item? This action cannot be undone. This action will also delete all dependent entities (e.g., kebeles and sites).
            </p>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancelDelete}
              className="py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded transition duration-150"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className={`py-2 px-4 text-white ${
                isDeleting ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
              } rounded transition duration-150`}
            >
              {isDeleting ? "Deleting..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};