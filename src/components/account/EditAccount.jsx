import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../redux/account/AccountApiSlice";
import { MainLoading } from "../Resource/Loading/Loadings";
import BackButton from "../Resource/Utility/BackButton";
import ReactSelect from "react-select";

export const EditAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [UpdateUsers] = useUpdateUserMutation();
  const {
    data: UserData,
    isSuccess,
    isFetching,
    refetch,
  } = useGetUserByIdQuery(id);
  const Roles = useSelector((state) => state.roles.roles);
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

      roles: formData.roles,
    };
  };

  if (!isSuccess || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MainLoading />
      </div>
    );
  }
  console.log(UserData.data);

  return (
    <div className="bg-dashbordColor">
      <div className="p-4">
        <BackButton />
      </div>
      <div className="flex items-center justify-center p-12 bg-dashbordColor">
        <div className="mx-auto w-full max-w-[550px]">
          <Formik
            initialValues={{
              FirstName: UserData.data.user.name
                ? splitName(UserData.data.user.name).firstName
                : "",
              LastName: UserData.data.user.name
                ? splitName(UserData.data.user.name).lastName
                : "",
              birthday: UserData.data.user.birthday
                ? new Date(UserData.data.user.birthday)
                    .toISOString()
                    .split("T")[0]
                : "",
              mobile: UserData.data.user.mobile,
              organization: UserData.data.user.organization,
              position: UserData.data.user.position,

              roles: UserData.data.user_roles,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const formattedData = formatFormData(values);
              const UpdatedUser = await UpdateUsers({
                ...formattedData,
                id: id,
              });
              if (UpdatedUser?.data) {
                toast.success("You have successfully Updated Your Profile!");
                refetch();
                navigate("/admin/accounts");
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
                        defaultValue={UserData.data.user_roles.map((role) => ({
                          value: role,
                          label: role,
                        }))}
                        onChange={(selectedOptions) => {
                          setFieldValue("roles", selectedOptions.map(option => option.value));
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
                        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white font-bold py-2 px-4  hover:bg-darkMain  rounded-md text-center text-base  outline-none"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
