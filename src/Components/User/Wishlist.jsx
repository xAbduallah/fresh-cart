import { Heart, Loader, ShoppingCart, Trash2 } from 'lucide-react';
import { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { CartContext } from '../../Contexts/CartContext';
import { motion } from "motion/react";
import RatingStars from '../Global/Helper/RatingStars';
import toast from 'react-hot-toast';

export default function Wishlist() {
    const { wishlist, removeFromWishlist } = useContext(UserContext);
    const { addProductToCart, updatingProduct } = useContext(CartContext);

    const handleAddToCart = async (item) => {
        try {
            await addProductToCart(item.id);
            removeFromWishlist(item.id);
        } catch (error) {
            toast.error('Failed to add item to cart');
        }
    };

    if (wishlist.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <Heart className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                        Your wishlist is empty
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Start adding some items to your wishlist!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}>
                <div className="bg-[var(--bg-secondary)] rounded-xl shadow-sm border border-[var(--border-secondary)]">
                    <div className="px-6 py-4 border-b border-[var(--border-secondary)]">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                            My Wishlist ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
                        </h2>
                    </div>

                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {wishlist.map((item) => (
                            <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="p-6 flex flex-col sm:flex-row items-center gap-6">

                                {/* Product Image */}
                                <div className="w-full sm:w-20 h-20 flex-shrink-0">
                                    <img
                                        src={item.imageCover}
                                        alt={item.title}
                                        className="w-full h-full object-contain rounded-lg"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-1">
                                                {item.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {item.brand?.name}
                                            </p>
                                            <div className="mt-2 flex items-center gap-4">
                                                <RatingStars rating={item.ratingsAverage} />
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    ({item.ratingsQuantity} reviews)
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                                {item.price} EGP
                                            </span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => removeFromWishlist(item.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 
                                                             transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    title="Remove from wishlist"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg 
                                                             hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
                                                    disabled={updatingProduct === item.id}
                                                >
                                                    {updatingProduct === item.id ? (
                                                        <Loader className="w-4 h-4 animate-spin text-[var(--text-primary)]" />
                                                    ) : (
                                                        <ShoppingCart className="w-4 h-4" />
                                                    )}
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
