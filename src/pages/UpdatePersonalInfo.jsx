import React from "react";
import { Formik, Form, Field } from "formik";
import { useUpdateProfileMutation } from "../redux/Profile/UpdateProfileApi";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { SetProfileData } from "../redux/Profile/ProfileSlice";

export const UpdatePersonalInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [UpdateProfile, { isLoading }] = useUpdateProfileMutation();
  const UserData = useSelector((state) => state.user.UserData);

  const splitName = (fullName) => {
    const [firstName, ...lastName] = fullName.split(" ");
    return {
      firstName: firstName,
      lastName: lastName.join(" "),
    };
  };
  const formatFormData = (formData) => {
    return {
      name: `${formData.FirstName} ${formData.LastName}`,
      birthday: formData.birthday,
      mobile: formData.mobile,
      organization: formData.organization,
      position: formData.position,
      avatar: formData.avatar,
    };
  };

 
  
  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <Formik
          initialValues={{
            FirstName:  UserData.name ? splitName(UserData.name).firstName : '',
            LastName: UserData.name ? splitName(UserData.name).lastName : '',
            birthday: UserData.birthday,
            mobile: UserData.mobile,
            organization: UserData.organization,
            position: UserData.position,
            avatar: UserData.avatar,
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const formattedData = formatFormData(values);

              const formData = new FormData();
          
              Object.entries(formattedData).forEach(([key, value]) => {
                formData.append(key, value);
              });
          
              formData.append("avatar", values.avatar);

              const UpdatedProfile = await UpdateProfile(formData);
              dispatch(SetProfileData(UpdatedProfile.data.data));
              // dispatch(setAvaterUrl(UpdatedProfile.data.data.avatar))
              navigate('/admin/profile');
              toast.success('You have successfully Updated Your Profile!');
            } catch (error) {
              toast.error('Error Updating Your Profile');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue }) => (
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
                    <label
                      htmlFor="avater"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="avatar"
                      id="image"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setFieldValue("avatar", file);
                     }}
                    />
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white font-bold py-2 px-4  hover:bg-darkMain  rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold outline-none"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
