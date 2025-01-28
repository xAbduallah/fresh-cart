import axios from "axios";
import HomeSlider from "./HomeSlider";
import { useState, useEffect } from "react";
import { Loader } from 'lucide-react';
import ProductDetails from "./ProductDetails";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate(0);
  const [products, setProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState('');
  const [loading, setLoading] = useState(false);
  const [productView, setProductView] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState("all");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((response) => {
        setLoading(false);
      });
  }, []);

  function getCategories() {
    const categories = products.map(product => product.category);
    const uniqueCategories = categories.reduce((uniqueCategories, category) => {
      if (!uniqueCategories.some(existingCategory => existingCategory._id === category._id)) {
        uniqueCategories.push(category);
      }
      return uniqueCategories;
    }, []);
    uniqueCategories.unshift({ _id: 'all', name: 'All' });
    return uniqueCategories;
  }

  return (
    <>
      <div className="flex justify-center items-center ms-[5%] text-2xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-900 to-green-500 p-4">
        Hi, I’ve implemented the authentication with its protection, but the cart API requests are still not finished yet.
      </div>

      <HomeSlider />
      {productView && <ProductDetails product={productView} setProduct={setProductView} />}
      <div className='relative mx-[5%] mt-5'>
        <h1 className='text-[#12181C] text-4xl'>Shop Popular Categories</h1>
        <div className="text-gray-600">

          {loading ?
            <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black z-10">
              <Loader className="animate-spin h-12 w-12 text-white" />
            </div>
            :
            <div>

              {/* Categories */}
              <div className='mt-5'>
                {getCategories().map((category) => (
                  <button key={`category${category._id}`}
                    onClick={() => { setSelectedCategories(category._id) }}
                    className={`m-1 p-1 px-5 ${category._id === selectedCategories ? `bg-gray-300` : `bg-slate-100`} rounded-lg`}>
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Products */}
              {products.length > 0 && (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                  {products.map((product) => {
                    if (selectedCategories === 'all' || selectedCategories === product.category._id) {
                      return (
                        <div key={`${product.imageCover}`}>
                          <div
                            className="relative bg-gray-100 p-1 rounded-lg text-start cursor-pointer"
                            onClick={() => navigate("/ProductDetails", { state: { product } })}
                            onMouseEnter={() => setHoveredProductId(product._id)}
                            onMouseLeave={() => setHoveredProductId('')}
                          >
                            <img className="w-[100%] mix-blend-multiply" src={product.imageCover} alt={product.title} />
                            <div className="p-4">
                              <hr className="bg-black" />
                              <h1 className="text-green-600 font-medium pt-3">{product.category.name}</h1>
                              <h2 className="text-black font-semibold line-clamp-1">{product.title}</h2>
                              <div className="flex justify-between font-medium pt-5">
                                <p>{product.price} EGP</p>
                                <div className="flex items-center">
                                  <i className="fa-solid fa-star text-[#FFC534] pe-1"></i>
                                  <p>{product.ratingsAverage}</p>
                                </div>
                              </div>
                            </div>
                            {/* Add to Cart Button */}
                            {hoveredProductId === product._id && (
                              <button className="absolute bottom-[25%] left-[25%] py-1 px-5 rounded-full bg-green-400 text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:bg-green-500 hover:shadow-green-100">
                                Add to Cart
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null; // Return null if the condition doesn't match
                  })}
                </div>
              )}

            </div>
          }
        </div>
      </div>
    </>
  );
}
