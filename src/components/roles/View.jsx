import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteRoleMutation } from "../../redux/roles/RolesApiSlice";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoles } from "../../redux/roles/RolesState";
import { MainLoading } from "../Resource/Loading/Loadings";
import DeleteConfirmationDialog from "../Resource/Utility/Delete/DeleteConfirmationDialog"; // Import the DeleteConfirmationDialog component
import { log } from "../Resource/Utility/Logger";

const View = () => {
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();
  const rolesData = useSelector((state) => state.roles.roles);
  const isLoadingRoles = useSelector((state) => state.roles.isLoadingRoles);
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState(null);
  const all_permissions = useSelector((state) => state.auth.all_permissions);

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
      log("Failed to delete role:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteRoleId(null);
  };

  return (
    <div className="container mx-auto pt-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
        <div className="p-6">
          <h1 className="text-lg font-semibold mb-6 ">Roles Management</h1>
          {all_permissions?.includes("create_roles") && (      
          <div className="flex justify-end items-center mb-6">
            <Link
              to="/admin/create-roles"
              className="text-xs inline-flex items-center justify-center bg-green-500 hover:bg-green-600 py-2 px-6 rounded text-white font-semibold transition duration-300"
            >
              Add New Role
            </Link>
          </div>
          )}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-white uppercase bg-green-50 dark:bg-green-700 ">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Role Name
                  </th>
                  <th scope="col" className="py-3 px-6 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {isLoadingRoles ? (
                  <tr className="bg-green-50 border-b">
                    <td colSpan="2" className="py-4 px-6 text-center">
                      <MainLoading />
                    </td>
                  </tr>
                ) : (
                  rolesData.map((role) => (
                    <tr key={role.id} className=" border-b hover:bg-green-100">
                      <td className="py-4 px-6 text-green-900">{role.name}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end items-center space-x-3">
                          {all_permissions?.includes("edit_roles") && (
                          <Link
                            to={`/admin/update-roles/${role.id}`}
                            className="text-green-600 hover:text-green-700 transition duration-300"
                          >
                            <EditOutlined />
                          </Link>
                          )}
                          {all_permissions?.includes("delete_roles") && (                        
                          <button
                            onClick={() => handleDeleteConfirmation(role.id)}
                            className="text-red-600 hover:text-red-700 transition duration-300"
                            title="Delete"
                            disabled={isDeleting}
                          >
                            <DeleteOutline />
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

export default View;
