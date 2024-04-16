import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteAccountMutation,
  useGetAccountsQuery,
} from "../../redux/account/AccountApiSlice";
import { Delete, Edit } from "@mui/icons-material";
import { MainLoading } from "../Resource/Loading/Loadings";
import AccountSkeleton from "../Resource/Loading/AccountSkeleton";
import DeleteConfirmationDialog from "../Resource/Utility/Delete/DeleteConfirmationDialog";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccounts } from "../../redux/account/AccountState";
import { GetAccount } from "../../redux/InitialState/GetAccount";
import Avatars from "../Resource/Utility/Avatars";

const UserAccount = () => {
  // const {
  //   data: accounts,
  //   isFetching,
  //   isSuccess,
  //   refetch,
  // } = useGetAccountsQuery();

  const accounts = useSelector((state) => state.account.accounts);
  const isLoadingAccounts = useSelector(
    (state) => state.account.isLoadingAccounts
  );
  const dispatch = useDispatch();
  const [sortedAccounts, setSortedAccounts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [showConfirmation, setShowConfirmation] = useState(false); // New state for confirmation dialog
  const [deleteAccountId, setDeleteAccountId] = useState(null); // New state for delete account id
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

  useEffect(() => {
    if (accounts) {
      const sorted = [...accounts].sort((a, b) => {
        // Check if both names are defined
        if (a.name && b.name) {
          if (sortOrder === "asc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        }
        // If one or both names are undefined, consider them equal for sorting purposes
        return 0;
      });
      setSortedAccounts(sorted);
    }
  }, [accounts, sortOrder, isLoadingAccounts]); // Added isLoadingAccounts to the dependency array

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = (accountId) => {
    setDeleteAccountId(accountId);
    setShowConfirmation(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    try {
      await deleteAccount(deleteAccountId).unwrap();
      toast.success("Account deleted successfully");
      dispatch(deleteAccounts(deleteAccountId));
      setShowConfirmation(false);
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteAccountId(null);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center bg-green-50 p-4 mb-4 rounded-md">
        <div>
          <h2 className="text-xl font-medium mb-2">Accounts List</h2>
         
        </div>
        <Link
          to="/admin/new-user"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Account
        </Link>
      </div>

      <div className="bg-white rounded-md shadow-md">
        <div className="p-4">
          <div className="flex justify-end mb-4">
            <div className="relative">
              <input
                type="text"
                className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Search Members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-0 top-0 h-full px-3 bg-blue-500 text-white rounded-r-md">
                🔍
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr>
                <th className="py-3 px-6 text-left">Image</th>
                <th
                  onClick={toggleSortOrder}
                  className="cursor-pointer py-3 px-6 text-left"
                >
                  Name
                  {sortOrder === "asc" ? (
                    <span>&#9650;</span>
                  ) : (
                    <span>&#9660;</span>
                  )}
                </th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Roles</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingAccounts ? (
                <AccountSkeleton />
              ) : (
                sortedAccounts
                  .filter(
                    (account) =>
                      account.name && // Ensure account.name is not undefined
                      account.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((account, index) => (
                    <tr key={index}>
                      <td className="py-4 px-6 text-gray-800">
                      <Avatars avatar={account.avatar} name={account.name} />
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        {account.name}
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        {account.email}
                      </td>
                      <td className="py-4 px-6 text-gray-800">
                        {account.roles.map((role) => role.name).join(", ") ??
                          ""}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end">
                          <Link
                            to={`/admin/update-account/${account.id}`}
                            className="text-blue-600 hover:text-blue-700 mr-2 transition duration-300"
                          >
                            <Edit className="w-5 h-5 inline-block" />
                          </Link>
                          <button
                            onClick={() => handleDeleteConfirmation(account.id)} // Updated to call handleDeleteConfirmation
                            className="text-red-600 hover:text-red-700 transition duration-300"
                            title="Delete"
                            disabled={isDeleting}
                          >
                            <Delete className="w-5 h-5 inline-block" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteConfirmationDialog
        showConfirmation={showConfirmation}
        handleConfirmDelete={handleConfirmDelete}
        handleCancelDelete={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default UserAccount;
