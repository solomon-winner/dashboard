import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
export const PasswordResetPage = ({ step }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(step === 2);

  return (
    <div className="flex justify-center items-center h-screen">
      
        <Formik
          initialValues={{
            newPassword: '',
            confirmPassword: '',
          }}
          validate={(values) => {
            const errors = {};
            // Add validation logic here if needed
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true);
            // Simulate an API call with a delay to show loading state
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success('Password reset successfully');
            setLoading(false);
            setSubmitting(false);
            navigate("/");
          }}
        >
          <Form className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl text-center font-bold mb-4">Set New Password</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                New Password
              </label>
              <Field
                type="password"
                name="newPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="New Password"
              />
              <ErrorMessage name="newPassword" component="div" className="text-red-500 text-xs" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm Password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs" />
            </div>
            <div className="flex items-center justify-between">
              <button
                className={` bg-mainColor hover:bg-lightgreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Setting...' : 'Set Password'}
              </button>
            </div>
          </Form>
        </Formik>
    </div>
  );
};