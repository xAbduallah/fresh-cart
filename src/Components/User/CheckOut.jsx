import axios from 'axios';
import * as Yup from 'yup';
import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../Contexts/UserContext";
import { CartContext } from '../../Contexts/CartContext';

export default function CheckOut() {
    const Navigate = useNavigate(0);
    const [response, setResponse] = useState({});
    const [requesting, setRequesting] = useState();
    const { user } = useContext(UserContext);
    const { totalCartPrice, cartId } = useContext(CartContext);

    const validationSchema = Yup.object({
        details: Yup.string()
            .min(10, 'Details must be at least 10 characters'),
        phone: Yup.string()
            .matches(/^(010|011|012|015)\d{8}$/, 'Phone number must be Egyptian and start with 010, 011, 012, or 015, followed by 8 digits')
            .required('Phone number is required'),
        city: Yup.string().required('City is required')
    });

    const initialValues = {
        details: '',
        phone: '',
        city: ''
    };

    const onSubmit = (values) => {
        if (!cartId || !user) {
            return;
        }
        setRequesting(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
            { shippingAddress: values },
            { headers: { token: user?.token } })
            .then((api) => {
                setRequesting(false);
                window.location.href = api.data.session.url;
            })
            .catch((api) => {
                setRequesting(false);
            });
    };

    return (
        <>
            {requesting > 0 && <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black z-10">
                    <Loader className="animate-spin h-12 w-12 text-[var(--text-primary)]" />
                </div>
            }
            <div className="max-w-xl mx-auto bg-[var(--bg-secondary)] p-6 rounded-lg shadow-md text-[var(--text-secondary)]">
                <h1 className="text-2xl font-bold mb-4 text-green-600">Checkout</h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {() => (
                        <Form>
                            {/* Details Field */}
                            <div className="mb-4">
                                <label htmlFor="details" className="block font-medium mb-1">
                                    Details
                                </label>
                                <Field
                                    as="textarea"
                                    id="details"
                                    name="details"
                                    placeholder="Enter order details or notes..."
                                    className="formik-field w-full p-2 bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg"
                                />
                                <ErrorMessage name="details" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Phone Field */}
                            <div className="mb-4">
                                <label htmlFor="phone" className="block font-medium mb-1">
                                    Phone Number
                                </label>
                                <Field
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className="formik-field w-full p-2 bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg"
                                />
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* City Field */}
                            <div className="mb-4">
                                <label htmlFor="city" className="block font-medium mb-1">
                                    City
                                </label>
                                <Field
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="formik-field w-full p-2 bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg"
                                />
                                <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            {/* Submit Button */}
                            <div className="flex flex-col">
                                <button type="submit" className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition">
                                    Place Order <span className='font-bold'>{totalCartPrice} EGP</span>
                                </button>
                            </div>

                            {/* Response Message */}
                            {response?.statusMsg && (
                                <div className="mt-5 rounded-lg flex flex-col items-center p-1">
                                    <h1 className={` ${response.statusMsg === "fail" ? 'text-red-600' : 'text-green-600'}`}>{response.message}</h1>
                                    <hr className="w-[50%] h-1 bg-red-100" />
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>

        </>
    );
};
