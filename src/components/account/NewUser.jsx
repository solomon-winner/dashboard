import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useParams } from "react-router-dom";
import { useGetRolesQuery } from "../../redux/roles/RolesApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useAddAccountMutation } from "../../redux/account/AccountApiSlice";

const NewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [AddUser, { isLoading }] = useAddAccountMutation();
  const { data: role, isSuccess, isError } = useGetRolesQuery();

  const Roles = useSelector((state) => state.roles.roles);

  const formatFormData = (formData) => {
    return {
      name: `${formData.FirstName} ${formData.LastName}`,
      password: formData.password,
      email: formData.email,
      birthday: formData.birthday,
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
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <Formik
          initialValues={{
            FirstName: "",
            LastName: "",
            password: "",
            email: "",
            birthday: "",
            mobile: "",
            organization: "",
            position: "",
            roles: [],
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const name = `${values.FirstName} ${values.LastName}`;
              const updatedValues = {
                ...values,
                name: name,
              };
              const formattedData = formatFormData(updatedValues);
              const NewUser = await AddUser(formattedData);
              console.log(NewUser);
            } catch (error) {
              console.error("Error adding account:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-wrap justify-center">
  <div className="-mx-3 flex flex-wrap">
    <div className="w-full px-3 sm:w-1/2 mb-5">
      <label htmlFor="FirstName" className="block text-lg font-medium text-gray-700">
        First Name
      </label>
      <Field
        type="text"
        name="FirstName"
        id="FirstName"
        placeholder="First Name"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
      />
    </div>
    <div className="w-full px-3 sm:w-1/2 mb-5">
      <label htmlFor="LastName" className="block text-lg font-medium text-gray-700">
        Last Name
      </label>
      <Field
        type="text"
        name="LastName"
        id="LastName"
        placeholder="Last Name"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
      />
    </div>
    <div className="w-full px-3 sm:w-1/2 mb-5">
      <label htmlFor="password" className="block text-lg font-medium text-gray-700">
        Password
      </label>
      <Field
        type="password"
        id="password"
        name="password"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
      />
    </div>
    <div className="w-full px-3 sm:w-1/2 mb-5">
      <label htmlFor="email" className="block text-lg font-medium text-gray-700">
        Email
      </label>
      <Field
        type="email"
        id="email"
        name="email"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
      />
    </div>
    <div className="w-full px-3 sm:w-1/2 mb-5">
      <label htmlFor="birthday" className="block text-lg font-medium text-gray-700">
        Birth day
      </label>
      <Field
        type="date"
        name="birthday"
        id="date"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
      />
    </div>
    <div className="w-full px-3 sm:w-1/2 mb-5">
      <label htmlFor="mobile" className="block text-lg font-medium text-gray-700">
        Phone number
      </label>
      <Field
        type="tel"
        name="mobile"
        id="phone"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
        pattern="^09\d{8}$"
      />
    </div>
    <div className="w-full px-3 sm:w-1/2 mb-5">
      <label htmlFor="organization" className="block text-lg font-medium text-gray-700">
        Organization
      </label>
      <Field
        type="text"
        name="organization"
        id="organization"
        placeholder="organization"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
      />
    </div>
    <div className="w-full px-3 sm:w-1/2 mb-5">
      <label htmlFor="position" className="block text-lg font-medium text-gray-700">
        Position
      </label>
      <Field
        type="text"
        name="position"
        id="Position"
        placeholder="Position"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
      />
    </div>
  </div>
  <div className="w-full px-3 sm:w-1/2 mb-5">
    <label htmlFor="Roles" className="block text-lg font-medium text-gray-700">
      Roles
    </label>
    <Field
      as="div"
      className="flex flex-wrap p-5 w-100"
      name="roles"
    >
      {Roles.map((role, index) => (
        <label key={index}>
          <Field
            type="checkbox"
            name="roles"
            value={role.name}
            className="mr-2"
          />
          {role.name}
        </label>
      ))}
    </Field>
    <div className="flex justify-between items-center mt-4 px-6">
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-500 text-white active:bg-green-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
      <Link
        to="/admin/Accounts"
        className="bg-red-500 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
      >
        Back
      </Link>
    </div>
  </div>
</Form>

  
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewUser;