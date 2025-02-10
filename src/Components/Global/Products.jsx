import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Loader, ShoppingCart, Heart } from 'lucide-react';
import { useContext, useState } from 'react';
import { CartContext } from '../../Contexts/CartContext';
import { UserContext } from '../../Contexts/UserContext';
import RatingStars from './Helper/RatingStars';
import { useNavigate } from 'react-router-dom';
import { Pagination } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledPagination = styled(Pagination)(({ theme }) => ({
    '& .MuiPaginationItem-root': {
        color: 'var(--text-primary)',
        '&:hover': {
            backgroundColor: 'var(--bg-tertiary)',
        },
        '&.Mui-selected': {
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            '&:hover': {
                backgroundColor: 'var(--color-primary-hover)',
            },
        },
    },
    '& .MuiSvgIcon-root': {
        color: 'var(--text-primary)',
    },
}));

export default function Products() {
    const { categorySlug } = useParams();
    const navigate = useNavigate();
    const { addProductToCart, updatingProduct } = useContext(CartContext);
    const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(UserContext);
    const [wishlistLoading, setWishlistLoading] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const { isLoading, data } = useQuery({
        queryKey: ['products', categorySlug, currentPage],
        queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${currentPage}`)
    });

    const handleWishlistAction = async (e, product) => {
        e.stopPropagation();
        setWishlistLoading(product._id);
        try {
            if (isInWishlist(product._id)) {
                await removeFromWishlist(product._id);
            } else {
                await addToWishlist(product);
            }
        } finally {
            setWishlistLoading(null);
        }
    };

    // Filter products by category if categorySlug is provided
    const products = data?.data?.data.filter(product =>
        !categorySlug || product.category.slug === categorySlug
    );

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader className="w-12 h-12 animate-spin text-[var(--text-primary)]" />
            </div>
        );
    }

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {categorySlug ? `${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)} Products` : 'All Products'}
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {products?.length || 0} products available
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {products?.map((product) => (
                    <div key={product._id} className="group relative bg-[var(--bg-secondary)] rounded-xl shadow-2xl hover:shadow-xl dark:shadow-gray-800 transition-all duration-300">
                        {/* Product Card Content */}
                        <div className="cursor-pointer" onClick={() => navigate(`/productdetails/${product._id}`)}>
                            <div className="relative overflow-hidden">
                                <img
                                    className="p-4 w-[90%] mx-auto transform transition-transform duration-500 group-hover:scale-105 dark:brightness-95 dark:contrast-95"
                                    src={product.imageCover}
                                    alt={product.title}
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Wishlist Button */}
                        <button
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-300"
                            onClick={(e) => handleWishlistAction(e, product)}
                            disabled={wishlistLoading === product._id}>
                            {wishlistLoading === product._id ? (
                                <Loader className="w-5 h-5 animate-spin text-[var(--text-primary)]" />
                            ) : (
                                <Heart
                                    className={`w-5 h-5 transition-all duration-300 ${isInWishlist(product._id)
                                        ? 'text-red-500 fill-red-500'
                                        : 'text-gray-600 hover:text-red-500'
                                        }`}
                                    stroke="currentColor"
                                    fill={isInWishlist(product._id) ? 'currentColor' : 'transparent'}
                                />
                            )}
                        </button>

                        {/* Product Details */}
                        <div className="px-5 pb-5">
                            {/* Brand name */}
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {product.brand.name}
                            </h4>

                            {/* Product title */}
                            <h5 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-green-600 transition-colors duration-300">
                              {product.title}
                            </h5>
                            <div className="flex items-center mt-2.5 mb-5">
                                <RatingStars rating={product.ratingsAverage} />
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                                    {product.ratingsAverage}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">{product.price} EGP</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addProductToCart(product._id);
                                    }}
                                    disabled={updatingProduct === product._id}
                                    className="relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-300 hover:from-green-500 hover:to-green-600"
                                >
                                    {updatingProduct === product._id ? (
                                        <Loader className="w-4 h-4 animate-spin text-[var(--text-primary)]" />
                                    ) : (
                                        <ShoppingCart className="w-4 h-4" />
                                    )}
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
                <StyledPagination
                    count={data?.data?.metadata?.numberOfPages || 1}
                    page={currentPage}
                    onChange={handlePageChange}
                    size="large"
                    className="text-gray-900 dark:text-white"
                />
            </div>
        </div>
    );
} 