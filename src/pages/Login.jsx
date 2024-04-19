import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../redux/auth/AuthApiSlice";
import { setCredentials } from "../redux/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    // console.log(values);
    try {
      const userData = await login(values).unwrap();
      dispatch(setCredentials({ ...userData, email: values.email }));
      console.log(userData);
      // setUser('');
      // setPwd('');
      navigate("/admin");
      toast.success("You have successfully logged in");
    } catch (error) {
      setSubmitting(false);
      setErrors(error);
      console.log(error);
      if (error.status === 401) {
        toast.error("Invalid credentials");
      }
      console.log(error, "error");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-9/12 ">
        <div className="flex border bg-white rounded-lg shadow-lg mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage:
                "url(https://th.bing.com/th/id/R.5c3ffac7de035b684f83c4175f1d710c?rik=hFdoVu5j7RVdaA&pid=ImgRaw&r=0)",
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-700 text-center">
              Tree Based Restoration Registry
            </h2>
            <p className="text-lg text-gray-600 text-center">Welcome back!</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                onSubmit(values, { setSubmitting, setErrors });
              }}
            >
              <Form>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder=""
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500  flex items-start"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-gray-500"
                    >
                      Forget Password?
                    </Link>
                  </div>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder=""
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500  flex items-start"
                  />
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="bg-mainColor text-white font-bold py-2 px-4 w-full text-center rounded hover:bg-darkMain"
                  >
                    Login
                  </button>
                </div>
              </Form>
            </Formik>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
