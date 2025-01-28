import axios from 'axios';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Loader } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function ForgetPassword() {

    //#region States
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [sentStatus, setSentStatus] = useState({});
    const [requesting, setRequesting] = useState(false);
    const [email, setEmail] = useState('');
    //#endregion

    //#region Validations
    const emailValidation = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
    });

    const codeValidation = Yup.object({
        resetCode: Yup.string().length(6, 'Code must be 6 characters').required('Verification code is required'),
    });

    const newPasswordValidation = Yup.object({
        newPassword: Yup.string().min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/\d/, 'Password must contain at least one number')
            .required('Password is required'),
        reNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });
    //#endregion

    //#region Submits
    const handleEmailSubmit = (values) => {
        setRequesting(true);
        axios
            .post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
            .then(({ data }) => {
                setRequesting(false);
                setSentStatus({
                    to: 'forgotPasswords',
                    message: data.message,
                    status: data.statusMsg
                });
                if (data.statusMsg === 'success') {
                    setEmail(values.email);
                    setStep(2);
                }
            })
            .catch((error) => {
                setRequesting(false);
                setSentStatus({
                    to: 'forgotPasswords',
                    message: error.response?.data?.message || 'Error occurred',
                    status: 'fail'
                });
            });
    };

    const handleCodeSubmit = (values) => {
        setRequesting(true);
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
            .then(({ data }) => {
                setRequesting(false);
                setSentStatus({
                    to: 'verifyResetCode',
                    message: 'Verified',
                    status: data.status
                });
                if (data.status === 'success') {
                    setStep(3);
                }
            })
            .catch((error) => {
                setRequesting(false);
                setSentStatus({
                    to: 'verifyResetCode',
                    message: error.response?.data?.message || 'Invalid code',
                    status: 'fail'
                });
            });
    };

    const handlePasswordSubmit = (values) => {
        setRequesting(true);
        axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
            email: email,
            newPassword: values.newPassword
        }).then(({ data }) => {
            setRequesting(false);
            setSentStatus(data);
            if (data.token.length > 64) {
                setStep(1);
                navigate('/login');
            }
        }).catch(({ response }) => {
            setRequesting(false);
            setSentStatus({
                to: 'resetPassword',
                message: response?.data?.message || 'Failed to reset password',
                status: 'fail'
            });
        });
    };
    //#endregion

    return (
        <>
            {requesting && (
                <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black z-10">
                    <Loader className="animate-spin h-12 w-12 text-white" />
                </div>
            )}
            <div className="max-w-md mx-auto bg-[#F0F3F2] p-6 rounded-lg shadow-md text-[#6E6E6F]">
                <h1 className="text-2xl font-bold mb-4 text-green-600">
                    {step === 1 && 'Reset Your Password'}
                    {step === 2 && 'Enter Verification Code'}
                    {step === 3 && 'Set New Password'}
                </h1>
                {step === 1 && (
                    <Formik initialValues={{ email: '' }} validationSchema={emailValidation} onSubmit={handleEmailSubmit}>
                        {() => (
                            <Form>
                                <div className="mb-4">
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition">
                                    Send Verification Code
                                </button>
                            </Form>
                        )}
                    </Formik>
                )}

                {step === 2 && sentStatus.to === 'forgotPasswords' && (
                    <Formik initialValues={{ resetCode: '' }} validationSchema={codeValidation} onSubmit={handleCodeSubmit}>
                        {() => (
                            <Form>
                                <div className="mb-4">
                                    <Field
                                        type="text"
                                        id="resetCode"
                                        name="resetCode"
                                        placeholder="Enter the verification code"
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <ErrorMessage name="resetCode" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition">
                                    Verify Code
                                </button>
                            </Form>
                        )}
                    </Formik>
                )}

                {step === 2 && (sentStatus.to === 'verifyResetCode' || sentStatus.to === 'resetPassword') && (
                    <Formik initialValues={{ newPassword: '', reNewPassword: '' }} validationSchema={newPasswordValidation} onSubmit={handlePasswordSubmit}>
                        {() => (
                            <Form>
                                <div className="mb-4">
                                    <Field
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        placeholder="Enter your new newPassword"
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="mb-4">
                                    <Field
                                        type="password"
                                        id="reNewPassword"
                                        name="reNewPassword"
                                        placeholder="Confirm your new password"
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                    <ErrorMessage name="reNewPassword" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
                                >
                                    Reset Password
                                </button>
                            </Form>
                        )}
                    </Formik>
                )}

                {sentStatus?.status && (
                    <div className="my-1 rounded-lg flex flex-col items-center p-1 text-center">
                        <h1 className={`text-sm ${sentStatus.status === 'fail' ? 'text-red-600' : 'text-green-600'}`}>
                            {sentStatus.message}
                        </h1>
                    </div>
                )}

                {step === 1 && (
                    <NavLink className="mt-2 block text-center" to="/login">
                        Remember password? <span className="font-semibold underline">Login</span>.
                    </NavLink>
                )}
            </div>
        </>
    );
}
