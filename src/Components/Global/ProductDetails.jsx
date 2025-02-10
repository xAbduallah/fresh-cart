import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../Contexts/CartContext';
import { UserContext } from '../../Contexts/UserContext';
import { GlobalContext } from '../../Contexts/GlobalContext';
import RatingStars from './Helper/RatingStars';
import Carousel from './Helper/Carousel';
import GetLoading from './Helper/GetLoading';
import { ShoppingCart, Package, RefreshCcw, Truck, Loader } from 'lucide-react';

export default function ProductDetails() {
    const params = useParams();
    const [mainImage, setMainImage] = useState('');
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const { addProductToCart, updatingProduct } = useContext(CartContext);
    const { authenticated } = useContext(UserContext);
    const { SetLoginRedirection } = useContext(GlobalContext);

    const Navigate = useNavigate();

    function addToCart() {
        if (!authenticated) {
            SetLoginRedirection(`/productdetails/${params.productID}`);
            Navigate('/login');
            return;
        }
        if (params.productID) {
            addProductToCart(params.productID);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${params.productID}`).then((response) => {
            setProduct(response.data.data);
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            console.log(error)
        });
    }, [params.productID]);

    if (product && mainImage === '') {
        setMainImage(product.imageCover);
    }

    if (isLoading) return <GetLoading />;

    return (
        <div className='mx-auto px-4 py-8'>
            <div className='flex flex-col lg:flex-row gap-8'>
                {/* Images */}
                <div className='w-full lg:w-1/2'>
                    <div className='sticky top-24'>
                        {product?.images && <Carousel images={product.images} duration={2500} />}
                    </div>
                </div>

                {/* Product Info */}
                <div className='px-5 w-full lg:w-1/2 space-y-6'>
                    {/* Brand and Category */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-full">
                            {product?.brand?.name}
                        </span>
                        <span className="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-full">
                            {product?.category?.name}
                        </span>
                    </div>

                    {/* Title and Price */}
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                            {product?.title}
                        </h1>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-2xl font-bold text-emerald-500">
                                {product?.price} EGP
                            </div>
                            <div className="flex items-center gap-2">
                                <RatingStars rating={product?.ratingsAverage} />
                                <span className="text-sm text-[var(--text-tertiary)]">
                                    ({product?.ratingsQuantity} reviews)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="prose prose-sm max-w-none text-[var(--text-secondary)]">
                        <p>{product?.description}</p>
                    </div>

                    {/* Stock Info */}
                    <div className="grid grid-cols-2 gap-1">
                        <div className="text-sm text-[var(--text-primary)]">
                            <span className="font-semibold">Available: </span>
                            <span className="text-emerald-500">{product?.quantity} in stock</span>
                        </div>
                        <div className="text-sm text-[var(--text-primary)]">
                            <span className="font-semibold">Sold: </span>
                            <span className="text-green-500">{product?.sold} items</span>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-1">
                        <div className="flex items-center gap-2 py-1 hover:scale-95 transition-transform duration-300">
                            <div className="p-1 bg-blue-500/10 rounded-lg">
                                <Truck className="w-5 h-5 text-blue-500" />
                            </div>
                            <span className="text-sm text-[var(--text-primary)]">Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-3 py-1 hover:scale-95 transition-transform duration-300">
                            <div className="p-1 bg-purple-500/10 rounded-lg">
                                <Package className="w-5 h-5 text-purple-500" />
                            </div>
                            <span className="text-sm text-[var(--text-primary)]">Secure Packaging</span>
                        </div>
                        <div className="flex items-center gap-3 py-1 hover:scale-95 transition-transform duration-300">
                            <div className="p-1 bg-green-500/10 rounded-lg">
                                <RefreshCcw className="w-5 h-5 text-green-500" />
                            </div>
                            <span className="text-sm text-[var(--text-primary)]">30 Days Return</span>
                        </div>
                        <div className="flex items-center gap-3 py-1 hover:scale-95 transition-transform duration-300">
                            <div className="p-1 bg-amber-500/10 rounded-lg">
                                <ShoppingCart className="w-5 h-5 text-amber-500" />
                            </div>
                            <span className="text-sm text-[var(--text-primary)]">Secure Checkout</span>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="relative mt-8">
                        <button
                            onClick={addToCart}
                            disabled={updatingProduct}
                            className="w-[80%] py-4 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg font-semibold
                            flex items-center justify-center gap-2 transition-all duration-300
                            hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-secondary)]
                            hover:shadow-lg hover:shadow-[var(--bg-secondary)]/20
                            disabled:opacity-50 disabled:cursor-not-allowed">
                            {
                                updatingProduct ? <Loader className="w-5 h-5 animate-spin" /> :
                                    <ShoppingCart className="w-5 h-5 hover:text-green-400" />
                            }

                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}