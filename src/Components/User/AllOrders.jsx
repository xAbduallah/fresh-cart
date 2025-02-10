import { ShoppingBasket, ArrowUp, ArrowDown, Loader } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import axios from 'axios';
import RatingStars from '../Global/Helper/RatingStars';
import { motion } from "motion/react"
import { useQuery } from '@tanstack/react-query';

export default function AllOrders() {
    const { user } = useContext(UserContext);
    const [orderDetails, setOrderDetails] = useState(null);

    const { data: orders, isLoading, error } = useQuery({
        queryKey: ['orders', user?.id],
        queryFn: async () => {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${user?.id}`);
            return data;
        },
        enabled: !!user,
        staleTime: 5 * 60 * 1000,
        retry: 2
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader className="h-12 w-12 animate-spin text-gray-500 dark:text-white" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-8">
                <p>{error.message}</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-8">
                <ShoppingBasket className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-600">No Orders Yet</h2>
                <p className="text-gray-500 mt-2">Start shopping to create your first order!</p>
            </div>
        );
    }

    return (
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                <div className="bg-[var(--bg-secondary)] rounded-2xl p-8 backdrop-blur-sm border border-[var(--border-primary)]">
                    <div className="flex flex-col sm:flex-row justify-start items-center mb-5 pb-3 gap-5 border-b border-[var(--border-primary)]">
                        <div className="bg-[var(--bg-primary)] p-3 rounded-xl">
                            <ShoppingBasket className="h-8 w-8 text-[var(--text-primary)]" />
                        </div>
                        <h1 className='text-xl font-bold text-gray-600 dark:text-gray-300 uppercase'>
                            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} for {user.name}
                        </h1>
                    </div>

                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="flex justify-between bg-[var(--bg-primary)] p-6 rounded-xl border border-[var(--border-secondary)] hover:border-[var(--border-primary)] transition-all cursor-pointer"
                                onClick={() => setOrderDetails(orderDetails === order._id ? null : order._id)}>
                                <div className='transition-all duration-500 flex-1'>
                                    <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-200">Order ID: {order._id}</h2>
                                    <p className="text-gray-500 dark:text-gray-400">Ordered on: {formatDate(order.createdAt)}</p>
                                    <p className="text-gray-500 dark:text-gray-400">Total Price: {order.totalOrderPrice} EGP</p>
                                    <p className={`text-sm font-semibold ${order.isPaid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>Status: {order.isPaid ? 'Paid' : 'Pending Payment'}</p>

                                    <div className={`transition-all duration-500 overflow-hidden ${orderDetails === order._id ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-gray-500 dark:text-gray-400">Payment Method: {order.paymentMethodType}</p>
                                        <p className={`text-sm font-semibold ${order.isDelivered ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                                            Delivery: {order.isDelivered ? 'Delivered' : 'In Progress'}</p>

                                        <div className="mt-4 space-y-4">
                                            {order.cartItems.map((item, index) => (
                                                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-[var(--bg-secondary)]">
                                                    <img src={item.product.imageCover} alt={item.product.title}
                                                        className="w-18 h-20 object-fit rounded-lg border border-gray-200 dark:border-gray-500" />
                                                    <div className="flex-1">
                                                        <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">{item.product.title}</h3>
                                                        <div className='flex gap-3 items-center mt-2'>
                                                            <p className="text-gray-600 dark:text-gray-300 font-semibold">{item.price} EGP</p>
                                                            <span className='border-r border-gray-300 dark:border-gray-500 h-5'></span>
                                                            <span className="text-gray-500 dark:text-gray-400">Quantity: {item.count}</span>
                                                            <span className='border-r border-gray-300 dark:border-gray-500 h-5'></span>
                                                            <div className="flex items-center"><RatingStars rating={item.product.ratingsAverage} /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button className="ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
                                    onClick={(e) => { e.stopPropagation(); setOrderDetails(orderDetails === order._id ? null : order._id); }}>
                                    {orderDetails === order._id ? (
                                        <ArrowUp className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                                    ) : (
                                        <ArrowDown className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

