import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteRoleMutation,
  useGetRolesQuery,
} from "../../redux/roles/RolesApiSlice";
import { Delete, Edit } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRoles,
  setLoadingRoles,
  setRoles,
} from "../../redux/roles/RolesState";

const View = () => {
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();
  const rolesData = useSelector((state) => state.roles.roles);
  const isLoadingRoles = useSelector((state) => state.roles.isLoadingRoles);
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState(null);

  const handleDeleteConfirmation = (roleId) => {
    setDeleteRoleId(roleId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteRole(deleteRoleId).unwrap();
      toast.success("Role deleted successfully");
      dispatch(deleteRoles(deleteRoleId));
      setShowConfirmation(false);
    } catch (error) {
      console.error("Failed to delete role:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteRoleId(null);
  };

  return (
    <div className="container h-screen pt-6">
      <div className="w-full md:w-3/4 mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">Roles</h1>
          <div className="flex justify-end items-center mb-6">
            <Link
              to="/admin/create-roles"
              className="bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded text-white font-semibold transition duration-300"
            >
              Add Roles
            </Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-100 text-gray-600">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Role Name
                  </th>
                  <th scope="col" className="py-3 px-6 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoadingRoles ? (
                  <tr className="bg-white border-b">
                    <td className="py-4 px-6 text-gray-800">Loading...</td>
                    <td className="py-4 px-6 text-right"></td>
                  </tr>
                ) : (
                  rolesData.map((role) => (
                    <tr key={role.id} className="bg-white border-b">
                      <td className="py-4 px-6 text-gray-800">{role.name}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end">
                          <Link
                            to={`/admin/update-roles/${role.id}`}
                            className="text-blue-600 hover:text-blue-700 mr-2 transition duration-300"
                          >
                            <Edit className="w-5 h-5 inline-block" />
                          </Link>
                          <button
                            onClick={() => handleDeleteConfirmation(role.id)}
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
      </div>

      {showConfirmation && (
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
      )}
    </div>
  );
};

export default View;
