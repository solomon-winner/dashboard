import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useParams } from "react-router-dom";
import { useGetRolesQuery } from "../../redux/roles/RolesApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {useAddAccountMutation} from "../../redux/account/AccountApiSlice"
const NewUser = () => {
  const { id } = useParams(); // Get the role ID from URL parameter
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [AddUser, { isLoading }] = useAddAccountMutation();
  const { data: role, isSuccess, isError } = useGetRolesQuery(); // Fetch role details by ID

  const Roles = useSelector((state) => state.roles.roles)
  Roles.map((role) => {
      console.log(role.name);

  })
  const formatFormData = (formData) => {
    return {
      name: `${formData.FirstName} ${formData.LastName}`,
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
            birthday: "",
            mobile: "",
            organization: "",
            position: "",
            roles: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const formattedData = formatFormData(values);
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
            <Form>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="FirstName"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="FirstName"
                      id="FirstName"
                      placeholder="First Name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="LastName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="LastName"
                    id="LastName"
                    placeholder="Last Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="birthday"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Your Birth day?
                    </label>
                    <Field
                      type="date"
                      name="birthday"
                      id="date"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
  <label htmlFor="mobile" className="mb-3 block text-base font-medium text-[#07074D]">
    Phone number
  </label>
  <Field
    type="tel"
    name="mobile"
    id="phone"
    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    pattern="^09\d{8}$"
  />
</div>
                </div>
                
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="organization"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Organization
                    </label>
                    <Field
                      type="text"
                      name="organization"
                      id="organization"
                      placeholder="organization"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
  <div className="mb-5">
    <label htmlFor="position" className="mb-3 block text-base font-medium text-[#07074D]">
      Position
    </label>
    <Field
      type="text"
      name="position"
      id="Position"
      placeholder="Position"
      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    />
    
  </div>
</div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                       <label 
                       htmlFor="Roles"
                       className="mb-3 block text-base font-medium text-[#07074D]">
                         Roles
                       </label>
                       <Field
  as="div" // Render as a div container
  className="flex flex-wrap p-5 w-100" // Apply flex layout
  name="roles" // Set the field name
>

{Roles.map ((role,index) => (
  <label key={index}>
  <Field
    type="checkbox"
    name="roles"
    value= {role.name}
    className="mr-2"
  />
  {role.name}
</label>
))}

  
 
  {/* Add more checkboxes as needed */}
</Field>


                       <div className="flex justify-between items-center mt-4 px-6">
  <button
    type="submit"
    disabled={isSubmitting}
    className="bg-green-500 text-white active:bg-green-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
  >
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </button>
  <Link to="/admin/Accounts" className="bg-green-500 text-white active:bg-green-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"> Back</Link>
</div>
                     </div>
                     </div>
                     {/* <div className="w-full px-4 mb-3">
                       <button
                         type="submit"
                         disabled={isSubmitting}
                         className="bg-mainColor text-white active:bg-mainColor font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                       >
                         {isSubmitting ? 'Submitting...' : 'Submit'}
                         
                       </button>
                       
                     </div>
                      */}
             
                     
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewUser;