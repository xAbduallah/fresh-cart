import { ArrowRight } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();
    let pathnames = location.pathname.split("/").filter((x) => x);

    if (pathnames.length === 0) {
        return null;
    }

    if (pathnames[0] === "productdetails") {
        pathnames = ["Product Details"];
    }

    const formatPathName = (name) => {
        switch (name.toLowerCase()) {
            case "productdetails":
                return "PRODUCT DETAILS";
            case "products":
                return "PRODUCTS";
            default:
                return name.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
        }
    };

    return (
        <nav className="flex items-center max-w-6xl mx-auto gap-3 py-4 px-6 rounded-lg bg-[var(--bg-secondary)] shadow-sm dark:shadow-gray-900/10 mb-5">
            <Link
                to="/"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-inter text-sm font-medium tracking-wide">
                HOME
            </Link>

            {pathnames.map((name, index) => {
                const isLast = index === pathnames.length - 1;
                const routeTo = isLast ? '#' : `/${pathnames.slice(0, index + 1).join("/")}`;
                const formattedName = formatPathName(name);

                return (
                    <span key={name} className="flex items-center gap-3">
                        <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        {isLast ? (
                            <span className="text-blue-600 dark:text-blue-400 font-inter text-sm font-bold tracking-wide">
                                {formattedName}
                            </span>
                        ) : (
                            <Link
                                to={routeTo}
                                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-inter text-sm font-medium tracking-wide">
                                {formattedName}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;