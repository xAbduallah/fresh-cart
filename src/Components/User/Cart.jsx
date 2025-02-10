import { ShoppingCart, Loader, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Contexts/CartContext';
import { useContext, useEffect } from 'react';
import { motion } from "motion/react"

export default function Cart() {

    const { cartProducts, totalCartPrice, numOfCartItems, updatingProduct, removingProduct, gettingCart, getCart, updateProductQuantity, removeProductFromCart, clearCart } = useContext(CartContext);

    useEffect(() => {
        getCart();
    }, []);

    if (!numOfCartItems) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }}>
                    <div className="text-center space-y-4 p-8 bg-[var(--bg-secondary)] rounded-2xl max-w-md w-full backdrop-blur-sm">
                        <ShoppingCart className="h-16 w-16 text-gray-600 dark:text-gray-400 mx-auto opacity-50" />
                        <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-400 dark:text-gray-500">
                            Looks like you haven't added any products yet.
                        </p>
                        <Link
                            to="/products"
                            className="inline-block mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                            Browse Products
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-8 backdrop-blur-sm border border-[var(--border-primary)]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-[var(--border-primary)]">
                    <div className="flex items-center space-x-4">
                        <div className="bg-[var(--bg-primary)] p-3 rounded-xl">
                            <ShoppingCart className="h-8 w-8 text-[var(--text-primary)]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-300">My Cart</h1>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {numOfCartItems} {numOfCartItems === 1 ? 'item' : 'items'} in cart
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row md:items-end gap-4 mt-4 sm:mt-0">
                        <div className="text-center">
                            <p className="text-gray-400 dark:text-gray-500 text-sm">Total Amount</p>
                            <p className="text-xl font-bold text-gray-600 dark:text-gray-300">
                                {totalCartPrice} EGP
                            </p>
                        </div>
                        <button
                            onClick={clearCart}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2">
                            <Trash2 size={18} />
                            Clear Cart
                        </button>
                        <Link
                            to="/checkout"
                            className="whitespace-nowrap px-8 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                            <span>Checkout</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                <div className="space-y-4">
                    {cartProducts?.map((item) => (
                        <div
                            key={item._id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between bg-[var(--bg-primary)] px-6 py-4 rounded-xl border border-[var(--border-secondary)] hover:border-[var(--border-primary)] transition-colors">
                            <div className="flex items-center space-x-4">
                                <div className="relative group">
                                    <img
                                        src={item.product.imageCover}
                                        alt={item.product.title}
                                        className="w-24 h-24 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-10 transition-opacity" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        {item.product.brand?.name}
                                    </h4>
                                    <h5 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-green-600 transition-colors duration-300">
                                        {item.product.title}
                                    </h5>

                                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                                        {item.price.toFixed(2)} EGP
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
                                <div className="flex relative items-center space-x-1 bg-[var(--bg-secondary)] rounded-lg p-1">
                                    {updatingProduct === item.product._id && (
                                        <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                                            <Loader className="w-7 h-7 animate-spin text-[var(--text-primary)]" />
                                        </div>
                                    )}
                                    <button
                                        onClick={() => updateProductQuantity(item.product._id, item.count - 1)}
                                        className="p-1.5 rounded-md hover:bg-[var(--bg-tertiary)] text-red-400 hover:text-red-600 transition-colors"
                                        disabled={updatingProduct === item.product._id}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="text-gray-400 dark:text-gray-300 w-8 text-center font-medium">
                                        {item.count}
                                    </span>
                                    <button
                                        onClick={() => updateProductQuantity(item.product._id, item.count + 1)}
                                        className="p-1.5 rounded-md hover:bg-[var(--bg-tertiary)] text-green-400 hover:text-green-600 transition-colors"
                                        disabled={updatingProduct === item.product._id}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className='relative'>
                                    {removingProduct === item.product._id && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Loader className="w-4 h-4 animate-spin text-[var(--text-primary)]" />
                                        </div>
                                    )}
                                    <button
                                        onClick={() => removeProductFromCart(item.product._id)}
                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-[var(--bg-tertiary)] rounded-lg transition-all"
                                        disabled={removingProduct === item.product._id}
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {gettingCart && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-black/20 rounded-2xl">
                        <Loader className="h-12 w-12 text-[var(--text-primary)] animate-spin" />
                    </div>
                )}
            </div>
        </div>
    );
}