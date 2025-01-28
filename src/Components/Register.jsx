import axios from 'axios';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Loader } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Register() {
    const Navigate = useNavigate(0);
    const [requesting, setRequesting] = useState(0);
    const [response, setResponse] = useState({});

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name cannot exceed 50 characters')
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/\d/, 'Password must contain at least one number')
            .required('Password is required'),
        rePassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Please confirm your password'),
        phone: Yup.string()
            .matches(/^(010|011|012|015)[0-9]{8}$/, 'Phone number must be an Egyptian number.')
            .required('Phone number is required'),
    });
    
    const initialValues = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
    };

    const onSubmit = (values) => {
        setRequesting(true);
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
            .then((api) => {
                setRequesting(false);
                Navigate('/login')
            })
            .catch((api) => {
                setRequesting(false);
                setResponse(api.response.data);
            });
    };

    return (
        <>
            {requesting &&
                <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black z-10">
                    <Loader className="animate-spin h-12 w-12 text-white" />
                </div>
            }
            <div className="max-w-md mx-auto bg-[#F0F3F2] p-6 rounded-lg shadow-md text-[#6E6E6F]">
                <h1 className="text-2xl font-bold mb-4 text-green-600">Register</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {() => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block font-medium mb-1">
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block font-medium mb-1">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block font-medium mb-1">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="rePassword" className="block font-medium mb-1">
                                    Confirm Password
                                </label>
                                <Field
                                    type="password"
                                    id="rePassword"
                                    name="rePassword"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                                <ErrorMessage name="rePassword" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phone" className="block font-medium mb-1">
                                    Phone
                                </label>
                                <Field
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <div className='flex flex-col'>
                                    <button type="submit" className="w-[100%] bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition">
                                        Register
                                    </button>
                                    <NavLink className="mt-2" to='/login'>Already registered? <span className="font-semibold underline">Sign in</span>.</NavLink>
                                </div>

                                {
                                    response?.statusMsg &&
                                    <div className='mt-5 rounded-lg flex flex-col items-center p-1'>
                                        <h1 className={` ${response.statusMsg === "fail" ? 'text-red-600' : 'text-green-600'}`}>{response.message}</h1>
                                        <hr className='w-[50%] h-1 bg-red-100' />
                                    </div>
                                }
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};
