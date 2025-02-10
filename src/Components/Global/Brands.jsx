import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loader, ChevronRight } from 'lucide-react';

export default function Brands() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['brands'],
        queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            .then((response) => response.data.data)
            .catch((error) => {
                console.error('Error fetching brands:', error);
                throw error;
            }),
        staleTime: 30 * 1000,
        cacheTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 2,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader className="w-12 h-12 animate-spin text-[var(--text-primary)]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[400px] text-red-500">
                Error loading brands. Please try again later.
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Shop by Brand
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Discover our featured brands
                </p>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data?.map((brand) => (
                    <Link
                        key={brand._id}
                        to={`/products?brand=${brand.slug}`}
                        className="group relative overflow-hidden bg-[var(--bg-secondary)] rounded-xl shadow-sm 
                        hover:shadow-xl transition-all duration-300 border border-[var(--border-secondary)]"
                    >
                        <div className="p-6">
                            {/* Brand Image */}
                            <div className="w-full h-32 mb-4 rounded-lg overflow-hidden flex items-center justify-center p-4">
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy" />
                            </div>

                            {/* Brand Content */}
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-green-500 transition-colors">
                                    {brand.name}
                                </h3>
                                <div className="mt-2 flex items-center justify-center">
                                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-green-500 transition-colors">
                                        View Products
                                    </span>
                                    <ChevronRight className="w-4 h-4 ml-1 text-gray-400 dark:text-gray-500 group-hover:text-green-500 transform transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>

                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500/20 rounded-xl transition-colors duration-300" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
