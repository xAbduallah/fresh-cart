import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

export let UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);

    function login(user, userToken) {
        const updatedUser = { ...user, token: userToken };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    }

    function logout() {
        setUser(null);
        localStorage.removeItem('user');
    }

    const getWishlist = async () => {
        if (!user) return;

        try {
            setIsLoadingWishlist(true);
            const { data } = await axios.get(
                'https://ecommerce.routemisr.com/api/v1/wishlist',
                { headers: { token: user.token } }
            );

            if (data.status === 'success') {
                setWishlist(data.data.map(item => ({
                    id: item._id,
                    title: item.title,
                    imageCover: item.imageCover,
                    price: item.price,
                    ratingsAverage: item.ratingsAverage,
                    ratingsQuantity: item.ratingsQuantity,
                    brand: item.brand
                })));
            }
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
            toast.error('Failed to load wishlist');
        } finally {
            setIsLoadingWishlist(false);
        }
    };

    const addToWishlist = async (item) => {
        if (!user) {
            toast.error('Please login first');
            return;
        }

        try {
            setIsLoadingWishlist(true);
            const { data } = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/wishlist',
                { productId: item._id },
                { headers: { token: user.token } }
            );

            if (data.status === 'success') {
                await getWishlist();
                toast.success(`${item.title || 'Item'} added to wishlist`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add to wishlist');
        } finally {
            setIsLoadingWishlist(false);
        }
    };

    const removeFromWishlist = async (id) => {
        if (!user) return;

        try {
            setIsLoadingWishlist(true);
            const { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                { headers: { token: user.token } }
            );

            if (data.status === 'success') {
                await getWishlist();
                toast.success('Item removed from wishlist');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to remove from wishlist');
        } finally {
            setIsLoadingWishlist(false);
        }
    };

    const isInWishlist = (id) => {
        return wishlist.some((item) => item.id === id || item._id === id);
    };

    if (user === null) {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            try {
                const usr = JSON.parse(storedUser);
                setUser(usr);
                setAuthenticated(usr?.token.length > 64);
            } catch (error) {
                setUser(null);
                setAuthenticated(false);
            }
        } else if (authenticated) {
            setAuthenticated(false);
        }
    } else if (!authenticated) {
        setAuthenticated(true);
    }

    useEffect(() => {
        if (authenticated && !user.verified) {
            axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken',
                { headers: { token: user.token } })
                .then((api) => {
                    if (api?.data?.message === 'verified') {
                        const updatedUser = { ...user, id: api.data.decoded.id, name: api.data.decoded.name, role: api.data.decoded.role, verified: true };
                        setUser(updatedUser);
                    }
                    else {
                        logout();
                    }
                })
                .catch((api) => {
                    logout();
                });

        }
    }, [user]);

    // Load wishlist when user logs in
    useEffect(() => {
        if (user && authenticated) {
            getWishlist();
        } else {
            setWishlist([]);
        }
    }, [user, authenticated]);

    return <UserContext.Provider
        value={{
            user,
            wishlist,
            authenticated,
            isLoadingWishlist,
            login,
            logout,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            getWishlist
        }}>
        {children}
    </UserContext.Provider>
}
