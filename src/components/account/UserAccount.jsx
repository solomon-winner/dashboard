import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDeleteAccountMutation } from "../../redux/account/AccountApiSlice";
import { Delete, Edit } from "@mui/icons-material";
import AccountSkeleton from "../Resource/Loading/AccountSkeleton";
import DeleteConfirmationDialog from "../Resource/Utility/Delete/DeleteConfirmationDialog";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccounts } from "../../redux/account/AccountState";
import Avatars from "../Resource/Utility/Avatars";
import { log } from "../Resource/Utility/Logger";
import Pagination from "../Resource/Pagination/Pagination";
const UserAccount = () => {
  const accounts = useSelector((state) => state.account.accounts);
  const isLoadingAccounts = useSelector(
    (state) => state.account.isLoadingAccounts
  );
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [accountsPerPage, setAccountsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortedAccounts, setSortedAccounts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false); // New state for confirmation dialog
  const [deleteAccountId, setDeleteAccountId] = useState(null); // New state for delete account id
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();
  const all_permissions = useSelector((state) => state.auth.all_permissions);

  log(accounts);

  // Inside the useEffect hook where you calculate sortedAccounts
  useEffect(() => {
    if (accounts) {
      setTotalPages(Math.ceil(accounts.length / accountsPerPage));
      const sorted = [...accounts].sort((a, b) => {
        if (a.name && b.name) {
          if (sortOrder === "asc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        }

        return 0;
      });
      // Apply the filter before slicing for pagination
      const filteredAndSortedAccounts = sorted.filter(
        (account) =>
          account.name &&
          account.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSortedAccounts(
        filteredAndSortedAccounts.slice(
          (currentPage - 1) * accountsPerPage,
          currentPage * accountsPerPage
        )
      );
    }
  }, [
    accounts,
    sortOrder,
    isLoadingAccounts,
    currentPage,
    searchTerm,
    accountsPerPage,
  ]); // Added searchTerm to dependencies

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
      log("Failed to delete account:", error);
    }
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteAccountId(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAccountsPerPageChange = (event) => {
    setAccountsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-green-50 p-4 mb-4 rounded-md">
        <div>
          <h2 className="text-base font-medium mb-2">Accounts List</h2>
        </div>
        {all_permissions?.includes("create_users") && (
        <Link
          to="/admin/new-user"
          className="mt-4 sm:mt-0 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-xs"
        >
          Add Account
        </Link>
          )}
      </div>

      <div className="bg-white rounded-md shadow-md overflow-x-auto">
        <div className="p-4">
          <div className="flex items-center mb-4 w-full">
            <div className="flex-grow flex items-center space-x-2">
              <label
                htmlFor="accountsPerPage"
                className="text-xs font-medium text-gray-700"
              >
                Accounts Per Page:
              </label>
              <select
                id="accountsPerPage"
                value={accountsPerPage}
                onChange={handleAccountsPerPageChange}
                className="border border-gray-300 bg-white h-10 pl-5 pr-10 py-2 text-sm leading-tight text-gray-700 focus:outline-none focus:bg-white focus:border-gray-900 rounded-md"
              >
                {[1, 5, 10, 15].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow relative">
              <input
                type="text"
                className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Search Members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-0 top-0 h-full px-3 bg-blue-500 text-white rounded-r-md">
                🔍
              </button>
            </div>
          </div>
          <table className="w-full text-left">
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
            <tbody className="text-sm">
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
                        {(account.roles || [])
                          .map((role) => role.name)
                          .join(", ") ?? ""}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end">
                          {all_permissions?.includes("edit_users") && (
                          <Link
                            to={`/admin/update-account/${account.id}`}
                            className="text-blue-600 hover:text-blue-700 mr-2 transition duration-300"
                          >
                            <Edit className="w-5 h-5 inline-block" />
                          </Link>
                          )}
                          {all_permissions?.includes("delete_users") && (
                          <button
                            onClick={() => handleDeleteConfirmation(account.id)} // Updated to call handleDeleteConfirmation
                            className="text-red-600 hover:text-red-700 transition duration-300"
                            title="Delete"
                            disabled={isDeleting}
                          >
                            <Delete className="w-5 h-5 inline-block" />
                          </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

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
