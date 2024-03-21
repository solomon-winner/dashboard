import React from "react";
import { Formik, Form, Field } from "formik";
import { Link } from 'react-router-dom';
import { useAddAccountMutation } from '../../redux/account/AccountApiSlice';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";

 const NewUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [AddUser, { isLoading }] = useAddAccountMutation();

  const formatFormData = (formData) => {
    return {
      name: `${formData.FirstName} ${formData.LastName}`,
      birthday: formData.birthday,
      mobile: formData.mobile,
      organization: formData.organization,
      position: formData.position,
      roles: formData.roles
    };
  };

 
  
  return (
    <div className="flex items-center justify-center p-12">
      {}
      <div className="mx-auto w-full max-w-[550px]">
        <Formik
          initialValues={{
            FirstName: '',
            LastName: '',
            birthday: '',
            mobile: '',
            organization: '',
            position: '',
            roles:''
          }}
          onSubmit={async (values, { setSubmitting }) => {
                            try {
                             const formattedData = formatFormData(values);
                                const NewUser = await AddUser(formattedData);
                                console.log(NewUser);
                                 // Optionally, display success message
                               } catch (error) {
                                 console.error('Error adding account:', error);
                                 // Optionally, display error message to the user
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
                    <label
                      htmlFor="mobile"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Phone number
                    </label>
                    <Field
                      type="tel"
                      name="mobile"
                      id="phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    <label
                      htmlFor="position"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Position
                    </label>
                    <Field
                      type="text"
                      name="position"
                      id="Position"
                      placeholder="Position"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-green-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                         as="select"
                         id="roles"
                         name="roles"
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-green-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       >
                      <option value="">Select a role</option>
                      <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      
                       </Field>
                       <div className="flex justify-between items-center mt-4 px-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-mainColor text-white active:bg-mainColor font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <Link to="/admin/Accounts" className='bg-mainColor text-white h-8 w-40 text-center rounded ml-4'> Back</Link>
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