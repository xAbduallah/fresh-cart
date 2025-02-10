import axios from "axios";
import { useState, useContext } from "react";
import { Heart, Loader, ShoppingCart, Check, Shield, RefreshCw } from 'lucide-react';
import ProductDetails from "./ProductDetails";
import { useQuery } from "@tanstack/react-query";
import imgSlider1 from "../../assets/images/slider-image-1.jpeg";
import imgSlider2 from "../../assets/images/slider-image-2.jpeg";
import imgSlider3 from "../../assets/images/slider-image-3.jpeg";
import imgSlider4 from "../../assets/images/grocery-banner.png";
import imgSlider5 from "../../assets/images/banner-4.jpeg";
import shoppingHero from "../../assets/images/shopping.png";
import { CartContext } from "../../Contexts/CartContext";
import RatingStars from "./Helper/RatingStars";
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Home() {
  const [productView, setProductView] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(null);

  const { addProductToCart, updatingProduct } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(UserContext);
  const navigate = useNavigate();

  let { isLoading, data } = useQuery({
    queryKey: ['homeProducts'],
    queryFn: function () {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }
  });

  const images = [imgSlider1, imgSlider2, imgSlider3, imgSlider4, imgSlider5];

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

  return (
    <>
      <div className="mx-[-3rem] relative py-5 overflow-hidden bg-[linear-gradient(130deg,var(--bg-primary)_0%,var(--bg-secondary)_50%,var(--bg-primary)_100%)]">
        <div className="relative z-20 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
            {/* Left content */}
            <div className="space-y-8 max-w-xl">
              <div className="space-y-2">
                <span className="inline-block px-4 py-1 bg-[var(--bg-secondary)] bg-opacity-20 text-[var(--text-secondary)] rounded-full text-sm font-medium">
                  New Collection 2025
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight">
                  Discover Your Style
                  <span className="block text-[var(--text-secondary)] mt-2">Shop the Latest Trends</span>
                </h1>
              </div>

              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Explore our curated collection of premium products at unbeatable prices.
                Join thousands of satisfied customers.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products" className="group px-8 py-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold rounded-lg hover:shadow-lg hover:shadow-[var(--bg-secondary)]/20 transition-all duration-300 flex items-center gap-2">
                  Shop Now

                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H1" />
                  </svg>
                </Link>
                <Link to="/categories" className="px-8 py-3 border-2 border-[var(--text-primary)] text-[var(--text-primary)] font-semibold rounded-lg hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300">
                  Browse Categories
                </Link>
              </div>

              <div className="flex gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-400 animate-bounce" />
                  <span className="text-sm text-[var(--text-secondary)]">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400 animate-bounce" />
                  <span className="text-sm text-[var(--text-secondary)]">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-green-400 animate-bounce" />
                  <span className="text-sm text-[var(--text-secondary)]">Easy Returns</span>
                </div>
              </div>
            </div>

            <div className="hidden md:block w-full max-w-md">
              <img
                src={shoppingHero}
                className="w-full h-auto rounded-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
      {productView && <ProductDetails product={productView} setProduct={setProductView} />}
      <div className='relative mt-5'>
        <h1 className='text-[#12181C] dark:text-white text-4xl'>Recent products...</h1>
        <div className="text-gray-600 dark:text-gray-300">
          <div>
            {isLoading &&
              <div className="inset-0 flex justify-center items-center z-10">
                <Loader className="w-12 h-12 animate-spin text-[var(--text-primary)]" />
              </div>
            }

            {/* Products */}
            {data?.data?.data?.length > 0 && (
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {data?.data?.data.map((product) => {
                  return <div key={`${product.imageCover}`}>
                    <div className="group relative w-full max-w-sm mx-auto bg-[var(--bg-secondary)] rounded-xl shadow-2xl hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Image and title container - clickable */}
                      <div className="cursor-pointer" onClick={(e) => { navigate(`/productdetails/${product._id}`); }}>
                        {/* Image container with hover effect */}
                        <div className="relative overflow-hidden">
                          <img
                            className="p-4 w-[90%] mx-auto transform transition-transform duration-500 group-hover:scale-105 dark:brightness-95 dark:contrast-95"
                            src={product.imageCover}
                            alt={product.title}
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Wishlist */}
                      <button
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-300"
                        onClick={(e) => handleWishlistAction(e, product)}
                        disabled={wishlistLoading === product._id}>
                        {
                          wishlistLoading === product._id ? (
                          <Loader className="w-5 h-5 animate-spin text-gray-600" />
                        ) : (
                          <Heart className={`w-5 h-5 transition-all duration-300 ${isInWishlist(product._id) ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'}`} stroke="currentColor" fill={isInWishlist(product._id) ? 'currentColor' : 'transparent'}
                          />
                        )}
                      </button>

                      {/* Content section - clickable */}
                      <div
                        className="px-5 pb-5 pt-2 cursor-pointer"
                        onClick={() => navigate(`/productdetails/${product._id}`)}
                      >
                        {/* Brand name */}
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {product.brand.name}
                        </h4>

                        {/* Product title */}
                        <h5 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-green-600 transition-colors duration-300">
                          {product.title}
                        </h5>

                        {/* Rating section */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex">
                            {<RatingStars rating={product.ratingsAverage} />}
                          </div>
                          <span className="text-sm font-medium text-gray-500">
                            ({product.ratingsQuantity})
                          </span>
                        </div>

                        {/* Price and Add to Cart section */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                              {product.price} EGP
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addProductToCart(product._id);
                            }}
                            disabled={updatingProduct === product._id}
                            className="relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-300 hover:from-green-500 hover:to-green-600 hover:shadow-lg hover:-translate-y-0.5"
                          >
                            {updatingProduct === product._id ? (
                              <Loader className="w-4 h-4 animate-spin text-[var(--text-primary)]" />
                            ) : (
                              <ShoppingCart className="w-4 h-4" />
                            )}
                            <span>Add to cart</span>

                          </button>
                        </div>
                      </div>
                    </div>
                  </div>;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
