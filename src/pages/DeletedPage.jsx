import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DeleteConfirmationDialog from '../components/Resource/Utility/Delete/DeleteConfirmationDialog';
import BackButton from '../components/Resource/Utility/BackButton';
import { Undo } from '@mui/icons-material';

const DeletedPage = () => {
  const [deletedItems, setDeletedItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    // Fetch the deleted items from the backend
    const fetchDeletedItems = async () => {
      try {
        const data = [
          { id: 1, name: 'Deleted Item 1' },
          { id: 2, name: 'Deleted Item 2' },
          { id: 3, name: 'Deleted Item 3' },
          { id: 4, name: 'Deleted Item 4' },
          { id: 5, name: 'Deleted Item 5' },
          { id: 6, name: 'Deleted Item 6' },
          { id: 7, name: 'Deleted Item 7' },
          { id: 8, name: 'Deleted Item 8' },
          { id: 9, name: 'Deleted Item 9' },
          { id: 10, name: 'Deleted Item 10' },
          // Add more items...
        ];
        setDeletedItems(data);
        setIsLoading(false); // Set loading to false after data fetching
      } catch (error) {
        console.error('Failed to fetch deleted items:', error);
        toast.error('Failed to load deleted items');
        setIsLoading(false); // Set loading to false on error
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
      // Placeholder for undo delete call
      toast.success('Item restored successfully');
      setDeletedItems(deletedItems.filter(item => item.id !== selectedItem.id));
      setShowConfirmation(false);
    } catch (error) {
      console.error('Failed to undo delete:', error);
      toast.error('Failed to restore item');
    }
  };

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = deletedItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <BackButton />
      <h1 className="text-3xl font-bold mt-6 mb-6">Deleted Items</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <React.Fragment>
          {currentItems.length > 0 ? (
            <ul className="space-y-4">
              {currentItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between px-4 py-3 bg-white shadow-md rounded-lg">
                  <span className="text-lg text-gray-800">{item.name}</span>
                  <button
                    onClick={() => handleUndoDelete(item)}
                    className="px-3 py-1 text-sm text-white bg-mainColor rounded-md hover:bg-lightgreen focus:outline-none focus:ring focus:ring-blue-300"
                  >
                   <Undo className="mr-1" style={{ fontSize: "medium"}}/>
                   Undo
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-4">No deleted items found.</p>
          )}
          {/* Pagination */}
          <nav className="mt-4" aria-label="Pagination">
            <ul className="flex justify-center">
              {Array.from({ length: Math.ceil(deletedItems.length / itemsPerPage) }).map((_, index) => (
                <li key={index}>
                  <button
                    className={`${
                      index + 1 === currentPage
                        ? ' bg-mainColor text-white'
                        : 'text-mainColor'
                    } font-semibold px-4 py-2 mx-1 rounded-full hover:bg-lightgreen hover:text-white focus:outline-none focus:ring focus:ring-blue-300`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </React.Fragment>
      )}
      <DeleteConfirmationDialog
        showConfirmation={showConfirmation}
        handleConfirmDelete={confirmUndoDelete}
        handleCancelDelete={() => setShowConfirmation(false)}
        isDeleting={false}
        message={"Before you proceed, please note that restoring this item will reverse the deletion action and make it accessible again. This means that any changes made after deletion will be reverted, and the item will appear in its original state. Are you sure you want to restore this item?"}
      />
    </div>
  );
};

export default DeletedPage;
