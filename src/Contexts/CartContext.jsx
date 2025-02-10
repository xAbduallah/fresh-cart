import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";

export const CartContext = createContext();


export default function CartProvider({ children }) {
    const { user } = useContext(UserContext);
    const [cartProducts, setCartProducts] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartId, setCartId] = useState(0);

    const [gettingCart, setGettingCart] = useState(false);
    const [updatingProduct, setUpdatingProduct] = useState('');
    const [removingProduct, setRemovingProduct] = useState('');

    function destroyCart() {
        setCartId(0);
        setCartProducts(null);
        setTotalCartPrice(0);
        setNumOfCartItems(0);
        setGettingCart(false);
        setUpdatingProduct('');
        setRemovingProduct('');
    }

    function updateCartDetails(data) {
        setCartId(data?.cartId);
        setNumOfCartItems(data?.numOfCartItems);
        setCartProducts(data?.data?.products);
        setTotalCartPrice(data?.data?.totalCartPrice);
    }

    function addProductToCart(productID) {
        if (user === null) return;
        setUpdatingProduct(productID);
        axios.post('https://ecommerce.routemisr.com/api/v1/cart',
            { productId: productID },
            { headers: { token: user.token } })
            .then(({ data }) => {
                toast.success(data?.message);
                updateCartDetails(data);
                setUpdatingProduct(null);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
                setUpdatingProduct(null);
            });
    }

    function removeProductFromCart(productID) {
        if (user === null) return;

        setRemovingProduct(productID);
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
            { headers: { token: user.token } })
            .then(({ data }) => {
                updateCartDetails(data);
                setRemovingProduct(null);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
                setRemovingProduct(null);
            });
    }

    function updateProductQuantity(productID, count) {
        if (user === null) return;

        if (count < 1) {
            return removeProductFromCart(productID);
        }

        setUpdatingProduct(productID);
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
            { count: count },
            { headers: { token: user.token } })
            .then(({ data }) => {
                updateCartDetails(data);
                setUpdatingProduct(null);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
                setUpdatingProduct(null);
            });
    }

    function getCart() {
        if (user === null) return;

        setGettingCart(true);
        axios.get('https://ecommerce.routemisr.com/api/v1/cart',
            { headers: { token: user.token } })
            .then(({ data }) => {
                updateCartDetails(data);
                setGettingCart(false);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
                setGettingCart(false);
            });
    }

    function clearCart() {
        if (user === null) return;

        setGettingCart(true);
        axios.delete('https://ecommerce.routemisr.com/api/v1/cart',
            { headers: { token: user.token } })
            .then(({ data }) => {
                destroyCart();
                toast.success('Cart cleared successfully');
                setGettingCart(false);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
                setGettingCart(false);
            });
    }

    useEffect(() => {
        getCart();
    }, [user]);

    return (
        <CartContext.Provider
            value={{
                getCart,
                destroyCart,
                addProductToCart,
                removeProductFromCart,
                updateProductQuantity,
                cartId,
                cartProducts,
                totalCartPrice,
                numOfCartItems,
                updatingProduct,
                removingProduct,
                gettingCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
