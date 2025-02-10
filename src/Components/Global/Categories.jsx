import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loader, ChevronRight } from 'lucide-react';

export default function Categories() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['categories'],
        queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then((response) => response.data.data)
            .catch((error) => {
                console.error('Error fetching categories:', error);
                throw error;
            }),
        staleTime: 30 * 1000, // Data is considered fresh for 30 seconds
        cacheTime: 5 * 60 * 1000, // Cache for 5 minutes
        refetchOnWindowFocus: false,
        retry: 2, // Retry failed requests up to 2 times
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
                Error loading categories. Please try again later.
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Shop by Category
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Explore our wide range of categories
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {data?.map((category) => (
                    <Link
                        key={category._id}
                        to={`/products/${category.slug}`}
                        className="group relative overflow-hidden bg-[var(--bg-secondary)] rounded-xl shadow-2xl hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center p-4">
                            {/* Image */}
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>

                            {/* Content */}
                            <div className="ml-4 flex-grow">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-green-500 transition-colors">
                                    {category.name}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Explore {category.name.toLowerCase()} collection
                                </p>
                            </div>

                            {/* Arrow */}
                            <div className="ml-4">
                                <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-green-500 transform transition-transform duration-300 group-hover:translate-x-1" />
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
