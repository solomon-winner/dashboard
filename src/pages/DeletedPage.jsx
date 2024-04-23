import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DeleteConfirmationDialog from '../components/Resource/Utility/Delete/DeleteConfirmationDialog';
import BackButton from '../components/Resource/Utility/BackButton';

const DeletedPage = () => {
  const [deletedItems, setDeletedItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch the deleted items from the backend
    const fetchDeletedItems = async () => {
      try {
        // This is a placeholder for the actual fetch call
        // const response = await fetch('your-api-endpoint-to-get-deleted-items');
        // const data = await response.json();
        const data = []; // Placeholder data
        setDeletedItems(data);
      } catch (error) {
        console.error('Failed to fetch deleted items:', error);
        toast.error('Failed to load deleted items');
      }
    };

    fetchDeletedItems();
  }, []);

  const handleUndoDelete = (item) => {
    setSelectedItem(item);
    setShowConfirmation(true);
  };

  const confirmUndoDelete = async () => {
    try {
      // This is a placeholder for the actual undo delete call
      // await fetch(`your-api-endpoint-to-undo-delete/${selectedItem.id}`, { method: 'POST' });
      toast.success('Item restored successfully');
      setDeletedItems(deletedItems.filter(item => item.id !== selectedItem.id));
      setShowConfirmation(false);
    } catch (error) {
      console.error('Failed to undo delete:', error);
      toast.error('Failed to restore item');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Deleted Items</h1>
      <BackButton />
      {deletedItems.length > 0 ? (
        <ul>
          {deletedItems.map((item) => (
            <li key={item.id} className="mb-2">
              {item.name}{' '}
              <button
                onClick={() => handleUndoDelete(item)}
                className="text-blue-500 hover:text-blue-700"
              >
                Undo Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No deleted items found.</p>
      )}
      <DeleteConfirmationDialog
        showConfirmation={showConfirmation}
        handleConfirmDelete={confirmUndoDelete}
        handleCancelDelete={() => setShowConfirmation(false)}
        isDeleting={false}
      />
    </div>
  );
};

export default DeletedPage;

