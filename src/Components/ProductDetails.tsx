import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { MyProductsContext } from '../Contexts/MyProductsContext';

const ProductDetails = () => {
    const { AddToCart } = useContext(MyProductsContext);
    const location = useLocation();
    const product = location.state?.product;
    const [mainImage, setMainImage] = useState('');

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <p className="text-gray-500">Loading product details...</p>
                </div>
            </div>
        );
    }
    if (mainImage === '') {
        setMainImage(product.imageCover);
    }

    useEffect(() => {

    }, []);

    return (
        <section className="p-5 mx-[5%] lg:mx-[20%] my-[2%] rounded-xl">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Slider */}
                <div className="flex flex-col lg:flex-row justify-center rounded-lg w-full gap-4">
                    {/* Thumbnails */}
                    <div className="flex lg:flex-col gap-2 w-full lg:max-w-[15%] max-h-[120px] lg:max-h-[400px] overflow-hidden lg:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 items-center justify-center"
                    >
                        {product.images?.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                onClick={() => setMainImage(image)}
                                alt={`${product.name} - ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-md border border-gray-300 hover:scale-110 transition-transform duration-200 cursor-pointer select-none"
                            />
                        ))}
                    </div>



                    {/* Main Image */}
                    <div className="flex justify-center w-full lg:max-w-[80%]">
                        <img
                            src={mainImage}
                            alt={`${product.name}`}
                            className="w-full max-h-[50vh] object-contain select-none"
                        />
                    </div>
                </div>


                {/* Product Info Section */}
                <div className="w-full flex flex-col justify-evenly max-w-full lg:ps-10">
                    <p className="font-medium text-lg text-indigo-600 mb-4">
                        {product.category?.name} &nbsp; / &nbsp; {product.brand?.name}
                    </p>
                    <h2 className="mb-2 font-manrope font-bold text-3xl leading-10 text-gray-900">
                        {product.name}
                    </h2>

                    <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                        <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                            {product.price} EGP
                        </h6>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className={`w-5 h-5 ${index < product.ratingsAverage ? "text-yellow-400" : "text-gray-200"
                                            }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="pl-2 font-normal leading-7 text-gray-500 text-sm">
                                {product.ratingsQuantity} reviews
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-500 text-base font-normal mb-2">
                        {product.description}
                    </p>

                    {/* Quantity Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                        <div className="flex items-center justify-start w-full">
                            <input
                                type="number"
                                min="1"
                                max={product.quantity}
                                defaultValue="1"
                                className="font-semibold text-gray-900 text-lg py-1 px-5 w-full lg:max-w-[118px] border border-gray-400 rounded-md bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50 focus:bg-gray-50 outline-0"
                            />
                        </div>
                        <button
                            onClick={() => AddToCart(product)}
                            className="group py-2 px-5 rounded-full bg-green-400 text-white font-semibold text-lg w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:bg-green-500 hover:shadow-green-100">
                            Add to cart
                        </button>
                    </div>

                    {/* Stock Info */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="text-sm text-green-600">
                            In Stock: <span className="font-semibold text-green-600">{product.quantity}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                            Sold: <span className="font-semibold text-gray-900">{product.sold}</span>
                        </div>
                    </div>

                    {/* Buy Now Button */}
                    <button className="w-full py-2 px-5 rounded-full bg-indigo-600 font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                        Buy Now
                    </button>
                </div>
            </div>
        </section>


    );
};

export default ProductDetails; 