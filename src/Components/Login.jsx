import axios from 'axios';
import * as Yup from 'yup';
import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Loader } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from "../Contexts/UserContext";

export default function Login() {
    const Navigate = useNavigate(0);
    const [response, setResponse] = useState({});
    const [requesting, setRequesting] = useState(0);
    const { user, login, logout } = useContext(UserContext);

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/\d/, 'Password must contain at least one number')
            .required('Password is required'),
    });

    const initialValues = {
        email: '',
        password: '',
    };

    const onSubmit = (values) => {
        setRequesting(true);
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
            .then((api) => {
                setRequesting(false);
                login(api.data.user, api.data.token);
                Navigate('/')
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
                <h1 className="text-2xl font-bold mb-4 text-green-600">Login</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {() => (
                        <Form>
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
                                <div className='flex items-center justify-between'>
                                    <label htmlFor="password" className="block font-medium mb-1">
                                        Password
                                    </label>
                                    <NavLink className="mt-2" to='/forgetpassword'><span className="font-semibold underline text-sm">Forget your password</span>?</NavLink>
                                </div>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <div className='flex flex-col'>
                                        <button type="submit" className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition">
                                            Login
                                        </button>
                                    <NavLink className="mt-2" to='/register'>New to FreshCart? <span className="font-semibold underline text-sm">Create an account</span>.</NavLink>
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
