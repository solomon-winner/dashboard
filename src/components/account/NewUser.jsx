import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useParams } from "react-router-dom";
import { useGetRolesQuery } from "../../redux/roles/RolesApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useAddAccountMutation } from "../../redux/account/AccountApiSlice";
import { createAccount } from "../../redux/account/AccountState";
import ReactSelect from "react-select";
import { log } from "../Resource/Utility/Logger";

const NewUser = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [AddUser, { isLoading }] = useAddAccountMutation();
  const { data: role, isSuccess, isError } = useGetRolesQuery(); 

  const Roles = useSelector((state) => state.roles.roles);
  Roles.map((role) => {
    log(role.name);
  });
  const formatFormData = (formData) => {
    return {
      name: `${formData.FirstName} ${formData.LastName}`,
      password: formData.password,
      email: formData.email,
      mobile: formData.mobile,
      organization: formData.organization,
      position: formData.position,
      roles: formData.roles,
    };
  };

  useEffect(() => {
    if (isError) {
      toast.error("Error fetching role details");
    }
  }, [isError]);

  return (
    <div className="flex flex-col items-center justify-center p-4 lg:flex-row lg:p-12">
      <div className="mx-auto w-full max-w-xl">
        <Formik
          initialValues={{
            name: "",
            password: "",
            email: "",
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            log(values);
            try {
              const name = `${values.FirstName} ${values.LastName}`;
              const updatedValues = {
                ...values,
                name: name,
              };
              log(updatedValues.roles);
              log(updatedValues);
              const formattedData = formatFormData(updatedValues);
              const NewUser = await AddUser(formattedData);
              if (NewUser?.data) {
                log(NewUser.data);
                toast.success("Account added successfully");
                dispatch(createAccount(NewUser.data.data.user));
                resetForm();
                navigate("/admin/accounts");
              }
            } catch (error) {
              log("Error adding account:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="FirstName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="FirstName"
                      id="FirstName"
                      placeholder="First Name"
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="LastName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="LastName"
                      id="LastName"
                      placeholder="Last Name"
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="space-y-5 col-span-1 sm:col-span-2">

                  <div>
                    <label
                      htmlFor="mobile"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Phone number
                    </label>
                    <Field
                      type="tel"
                      name="mobile"
                      id="phone"
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                      pattern="^09\d{8}$"
                    />
                  </div>
                </div>
                <div className="space-y-5 col-span-1 sm:col-span-2">
                  <div>
                    <label
                      htmlFor="organization"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Organization
                    </label>
                    <Field
                      type="text"
                      name="organization"
                      id="organization"
                      placeholder="Organization"
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="position"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Position
                    </label>
                    <Field
                      type="text"
                      name="position"
                      id="Position"
                      placeholder="Position"
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <div className="mb-5">
                    <label
                      htmlFor="Roles"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Roles
                    </label>
                    <ReactSelect
                        className="w-full bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        options={Roles.map((role) => ({
                          value: role.name,
                          label: role.name,
                        }))}
                        isMulti
                        name="roles"
                        onChange={(selectedOptions) => {
                          setFieldValue("roles", selectedOptions.map(option => option.value));
                       }}
                      />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                <Link
                  to="/admin/Accounts"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Back
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewUser;

