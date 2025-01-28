import axios from "axios";
import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

interface MyProductsContextType {
    AddToCart: (product: any) => void;
    RemoveProduct: (product: any) => void;
    UpdateQuantity: (product: any) => void;
    ClearCart: (product: any) => void;
}

const defaultContext: MyProductsContextType = {
    AddToCart: () => { },
    RemoveProduct: () => { },
    UpdateQuantity: () => { },
    ClearCart: () => { },
};

const MyProductsContext = createContext<MyProductsContextType>(defaultContext);

export default function MyProductsProvider({ children }: { children: ReactNode }) {
    const { user } = useContext(UserContext);

    const [myProducts, setMyProducts] = useState<any[]>([]);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);

    function UpdateQuantity(product: any) {

    }

    function AddToCart(product: any) {        
        useEffect(() => {
            if (user?.token) {
                axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: product.id }, {
                    headers: {
                        token: `${user.token}`,
                    }
                })
                    .then((response) => {
                    })
                    .catch((error) => {
                        console.error("Error fetching cart data:", error);
                    });
            }
        }, []);
    }

    function RemoveProduct(product: any) {

    }

    function ClearCart(product: any) {

    }

    useEffect(() => {
        if (user?.token) {
            axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: {
                    token: `${user.token}`,
                },
            })
                .then((response) => {
                    setMyProducts(response.data.data.products);
                    setNumOfCartItems(response.data.numOfCartItems);
                    setTotalCartPrice(response.data.data.totalCartPrice);                    
                })
                .catch((error) => {
                    console.error("Error fetching cart data:", error);
                });
        }
    }, []);

    return (
        <MyProductsContext.Provider value={{ AddToCart, RemoveProduct, UpdateQuantity, ClearCart }}>
            {children}
        </MyProductsContext.Provider>
    );
}

export { MyProductsContext };
