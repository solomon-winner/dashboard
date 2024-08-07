import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  useEditRoleMutation,
  useGetPermissionsQuery,
  useGetRoleByIdQuery,
} from "../../redux/roles/RolesApiSlice"; // Adjust the import path as necessary
import { Check } from "@mui/icons-material";
import { toast } from "react-toastify";
import { FormField } from "../Resource/Utility/FormField";
import { useNavigate } from "react-router-dom";
import { MainLoading } from "../Resource/Loading/Loadings";
import BackButton from "../Resource/Utility/BackButton";
import { log } from "../Resource/Utility/Logger";
const EditRole = () => {
  const location = useLocation();
  const { id } = location.state || {};

  const [editRole] = useEditRoleMutation();
  const {
    data: role,
    isSuccess: roleSuccess,
    isFetching: roleFetching,
    refetch,
  } = useGetRoleByIdQuery(id);
  const { data: permissions, isSuccess, isFetching } = useGetPermissionsQuery();
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Role name is required"),
    // Add validation for other fields as necessary
  });
  useEffect(() => {
    if (!id) {
      navigate('/'); // Redirect if no ID is provided
    }
  }, [id, navigate]);
  if (!roleSuccess || roleFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MainLoading />
      </div>
    );
  }
  const initialValues = {
    name: role.data.role.name,
    permissions: role.data.role.permissions.map(
      (permission) => permission.name
    ),
  };
  const groupedPermissions = permissions?.data.reduce((acc, permission) => {
    if (!acc[permission.group_name]) {
      acc[permission.group_name] = [];
    }
    acc[permission.group_name].push(permission);
    return acc;
  }, {});

  const handleSelectAll = () => {
    const allPermissions = permissions.data.map(
      (permission) => permission.name
    );
    setSelectedPermissions(allPermissions);
  };

  const handleUnselectAll = ({ handleChange }) => {
    setSelectedPermissions([]);
    handleChange({
      target: {
        name: "permissions",
        value: [],
      },
    });
  };

  const handleSubmit = async (values, { resetForm }) => {
    const response = await editRole({
      ...values,
      id: id,
    });
    log(response);
    if (response?.data) {
      toast.success("Role added successfully");
      refetch();
      window.location.href = "/admin/roles";
      // navigate("/admin/roles");
    }
  };

  return (
    <div className="container mx-auto p-14 flex-grow justify-center items-center bg-dashbordColor">
      <div className="mb-4">
        <BackButton />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, values, isSubmitting }) => (
          <Form className="bg-white shadow-md rounded p-8 pt-6 pb-8 mb-4 w-full">
            <h1 className="text-lg font-bold mb-5">Roles</h1>
            <FormField
              name="name"
              label="Role Name"
              type="text"
              value={values.name} // Display role name in the input field
              handleChange={handleChange}
            />
            {isFetching || roleFetching ? (
              <div>Loading permissions...</div>
            ) : isSuccess && roleSuccess ? (
              <div className="flex flex-wrap justify-between">
                {Object.entries(groupedPermissions).map(
                  ([groupName, permissions], index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/3">
                      <h3 className="text-base font-semibold mb-2">
                        {groupName.charAt(0).toUpperCase() + groupName.slice(1)}
                      </h3>
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="mb-2 flex items-center text-xs"
                        >
                          <div className="relative">
                            <Field
                              id={`permission-${permission.id}`}
                              name="permissions"
                              type="checkbox"
                              value={permission.name}
                              checked={
                                (values.permissions || []).includes(
                                  permission.name
                                ) ||
                                (selectedPermissions || []).includes(
                                  permission.name
                                )
                              }
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                const permissionName = permission.name;
                                if (isChecked) {
                                  setSelectedPermissions([
                                    ...selectedPermissions,
                                    permissionName,
                                  ]);
                                } else {
                                  setSelectedPermissions(
                                    selectedPermissions.filter(
                                      (name) => name !== permissionName
                                    )
                                  );
                                }
                                handleChange(e);
                              }}
                              className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                            />
                            {/* Check icon */}
                            <div className="pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                              <Check className="mb-2" />
                            </div>
                          </div>
                          <label
                            className="block uppercase text-gray-500 text-xs font-bold mb-2 ml-2"
                            htmlFor={`permission-${permission.id}`}
                          >
                            {permission.name.replace(/_/g, ' ')}
                          </label>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            ) : (
              <div>Error loading permissions.</div>
            )}

            <div className="mt-4 flex flex-wrap justify-between items-center">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    handleSelectAll();
                    handleChange({
                      target: {
                        name: "permissions",
                        value: permissions.data.map(
                          (permission) => permission.name
                        ),
                      },
                    });
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-2 sm:mt-0 mr-2"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={() => handleUnselectAll({ handleChange })}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2 sm:mt-0"
                >
                  Unselect All
                </button>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2 sm:mt-0"
              >
                {isSubmitting ? "Saving..." : "Save Role"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditRole;
