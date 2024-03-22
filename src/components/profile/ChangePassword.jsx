import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetPasswordData } from '../../redux/password/changePasswordSlice';
import { useNavigate } from 'react-router-dom';
import { useChangePasswordMutation } from '../../redux/password/passwordApi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const validationSchema = Yup.object().shape({
    current_password: Yup.string().required('Current password is required'),
    new_password: Yup.string()
        .required('New password is required'),
        new_password_confirmation: Yup.string()
        .required('Confirm your new password!')
        .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
});

const ChangePassword = () => {
    const Avatar = useSelector((state) => state.user.UserData.avatar)
    console.log(Avatar);
    const navigate = useNavigate();
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const dispatch = useDispatch();

    const onSubmit = async (values, { setErrors }) => {
        try {
            const passwordData = await changePassword(values).unwrap();
            dispatch(SetPasswordData(passwordData));
            navigate('/admin/profile');
            toast.success('You have successfully changed your password!');
        } catch (error) {
            setErrors({ new_password_confirmation: 'Error changing password' });
            toast.error('Error changing password');
        }
    };

    const clearConfirmPassword = (setFieldValue) => {
        setFieldValue('new_password_confirmation', '');
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                <div className="flex items-center space-x-2 mb-6">
                    <img src={`https://tbrr.echnoserve.com/storage/app/public/${Avatar}`}  alt="Lock Icon" className="rounded-full w-10 h-10" />
                    <h1 className="text-xl font-semibold">Change Password</h1>
                </div>
                <p className="text-sm text-gray-600 mb-6">Update password for enhanced account security.</p>
                <Formik
                    initialValues={{
                        current_password: '',
                        new_password: '',
                        new_password_confirmation: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form className="space-y-6">
                            <div>
                                <label htmlFor="current_password" className="text-sm font-medium text-gray-700 block mb-2">Current Password *</label>
                                <Field
                                    type="password"
                                    id="current_password"
                                    name="current_password"
                                    className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                                <ErrorMessage name="current_password" component="div" className="text-red-500 flex items-start" />
                            </div>
                            <div>
                                <label htmlFor="new_password" className="text-sm font-medium text-gray-700 block mb-2">New Password *</label>
                                <Field
                                    type="password"
                                    id="new_password"
                                    name="new_password"
                                    className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                                <ErrorMessage name="new_password" component="div" className="text-red-500 flex items-start" />
                            </div>
                            <div>
                                <label htmlFor="new_password_confirmation" className="text-sm font-medium text-gray-700 block mb-2">Confirm New Password *</label>
                                <Field
                                    type="password"
                                    id="new_password_confirmation"
                                    name="new_password_confirmation"
                                    className="password-input form-input block w-full border border-gray-300 rounded-md shadow-sm"
                                    required
                                />
                                <ErrorMessage name="new_password_confirmation" component="div" className="text-red-500 flex items-start" />
                                <button type="button" onClick={() => clearConfirmPassword(setFieldValue)} className="text-xs text-blue-600 hover:underline mt-1">Clear</button>
                            </div>
                            <div id="passwordCriteria" className="text-sm space-y-2">
                                <p className="text-red-500">The password must contain:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>At least 1 uppercase</li>
                                    <li>At least 1 number</li>
                                    <li>At least 8 characters</li>
                                </ul>
                            </div>
                            <div className="flex justify-between">
                                <button type="button" onClick={() => navigate('/admin/profile')} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300">Discard</button>
                                <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 hover:bg-darkMain rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold outline-none" disabled={isLoading}>Apply Changes</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ChangePassword;