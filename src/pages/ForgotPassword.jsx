import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "../redux/auth/AuthApiSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
});

const onSubmit = async (values, { setSubmitting, setErrors },forgotPassword) => {
  try {
    console.log(values);
    forgotPassword(values);
    setSubmitting(false);
    console.log(values);
  } catch (error) {
    setSubmitting(false);
    setErrors(error);
    console.log(error);
  }
};

export const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <div className="flex w-full h-screen justify-center items-center bg-dashbordColor">
      <div className="w-full max-w-md mx-auto p-6">
        <div className=" border bg-white rounded-xl shadow-lg">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600  ">
                Remember your password?
                <Link
                  className="text-mainColor decoration-2 hover:underline font-medium"
                  to="/login"
                >
                  Login here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  onSubmit(values, { setSubmitting, setErrors },forgotPassword);
                }}
              >
                <Form>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold ml-1 mb-2  "
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          placeholder=""
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm  focus:outline-none focus:border-mainColor  shadow-sm"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500  flex items-start"
                        />
                      </div>
                      <p
                        className="hidden text-xs text-red-600 mt-2"
                        id="email-error"
                      >
                        Please include a valid email address so we can get back
                        to you
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-mainColor text-white hover:bg-darkMain focus:outline-none focus:ring-2 focus:ring-mainColor focus:ring-offset-2 transition-all text-sm  "
                    >
                      Reset password
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
