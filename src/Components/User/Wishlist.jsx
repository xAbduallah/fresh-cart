import { Heart, Loader, ShoppingCart, Trash2 } from 'lucide-react';
import { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { CartContext } from '../../Contexts/CartContext';
import { motion } from "motion/react";
import RatingStars from '../Global/Helper/RatingStars';
import toast from 'react-hot-toast';

export default function Wishlist() {
    const { wishlist, removeFromWishlist, isLoadingWishlist } = useContext(UserContext);
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

                    <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto">
                        {wishlist.map((item) => (
                            <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="p-4 flex flex-col sm:flex-row items-start gap-4">
                                
                                {/* Product Image */}
                                <div className="w-full sm:w-20 h-28 flex-shrink-0">
                                    <img
                                        src={item.imageCover}
                                        alt={item.title}
                                        className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 flex flex-col sm:flex-row justify-between gap-2">
                                    <div className='flex flex-col gap-1'>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.brand?.name}</p>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-2">{item.title}</h3>
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">{item.price} EGP</span>
                                        
                                        <div className="flex items-center gap-2">
                                            <RatingStars rating={item.ratingsAverage} />
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                ({item.ratingsQuantity})
                                            </span>
                                        </div>
                                    </div>

                                    {/* Add to Cart and Remove from Wishlist */}
                                    <div className="flex flex-wrap sm:flex-col justify-center gap-2">
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
                                            disabled={updatingProduct === item.id}
                                        >
                                            {updatingProduct === item.id ?
                                                <Loader className="w-4 h-4 animate-spin" /> :
                                                <ShoppingCart className="w-4 h-4" />
                                            }
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-white hover:bg-red-500 border border-red-500 rounded-lg transition-colors"
                                            title="Remove from wishlist"
                                        >
                                            {isLoadingWishlist ?
                                                <Loader className="w-4 h-4 animate-spin" /> :
                                                <Trash2 className="w-4 h-4" />
                                            }
                                            Remove
                                        </button>
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
