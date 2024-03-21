import React, { useEffect } from "react";
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
  const handleDelete = async (roleId) => {
    try {
      await deleteRole(roleId).unwrap();
      toast.success("Role deleted successfully");
      dispatch(deleteRoles(roleId));
    } catch (error) {
      console.error("Failed to delete role:", error);
    }
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
                            onClick={() => handleDelete(role.id)}
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
    </div>
  );
};

export default View;
