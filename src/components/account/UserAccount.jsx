import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetAccountsQuery } from '../../redux/account/AccountApiSlice';
import { Delete, Edit } from '@mui/icons-material';

const UserAccount = () => {
  const { data: accounts, refetch } = useGetAccountsQuery();
  const [sortedAccounts, setSortedAccounts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch accounts data on component mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Sort accounts by name
  useEffect(() => {
    if (accounts?.data?.data) {
      const sorted = [...accounts.data.data].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      setSortedAccounts(sorted);
    }
  }, [accounts, sortOrder]);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
console.log(accounts.data.data)
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center bg-green-50 p-4 mb-4 rounded-md">
        <div>
          <h2 className="text-xl font-medium mb-2">Accounts List</h2>
          <p className="text-gray-600">Accounts are people that enter and check the given data. View and manage your members here.</p>
        </div>
        <Link to="/admin/new-user" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Account</Link>
      </div>

      <div className="bg-white rounded-md shadow-md">
        <div className="p-4">
          <div className="flex justify-end mb-4">
            <div className="relative">
              <input type="text" className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="Search Members..." />
              <button className="absolute right-0 top-0 h-full px-3 bg-blue-500 text-white rounded-r-md">🔍</button>
            </div>
          </div>

          <table className="w-full">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr>
                <th className="py-3 px-6 text-left">Image</th>
                <th onClick={toggleSortOrder} className="cursor-pointer py-3 px-6 text-left">
                  Name
                  {sortOrder === 'asc' ? <span>&#9650;</span> : <span>&#9660;</span>}
                </th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Roles</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedAccounts.map((account, index) => (
                <tr key={index}>
                  <td className="py-4 px-6 text-gray-800"><img src={`https://tbrr.echnoserve.com/storage/app/public/${account.avatar}`} alt='' className="w-12 h-12 rounded-full" /></td>
                  <td className="py-4 px-6 text-gray-800">{account.name}</td>
                  <td className="py-4 px-6 text-gray-800">{account.email}</td>
                  <td className="py-4 px-6 text-gray-800">{account.roles?.join(', ') ?? ''}</td>
                  <td className="py-4 px-6 text-right">
                        <div className="flex justify-end">
                          <Link
                          //  to={`/admin/update-roles/${role.id}`}
                            className="text-blue-600 hover:text-blue-700 mr-2 transition duration-300"
                          >
                            <Edit className="w-5 h-5 inline-block" />
                          </Link>
                          <button
                          //  onClick={() => handleDeleteConfirmation(role.id)}
                            className="text-red-600 hover:text-red-700 transition duration-300"
                            title="Delete"
                            //disabled={isDeleting}
                          >
                            <Delete className="w-5 h-5 inline-block" />
                          </button>
                        </div>
                      </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
