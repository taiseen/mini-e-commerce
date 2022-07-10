import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom'
import FakeStoreApi from './../api/fakeStoreApi';


const initialState = {
    cart: [],
    cartItemCount: () => 0,
    addToCart: () => null,
    removeFromCart: () => null,
    increaseQuantity: () => null,
    decreaseQuantity: () => null,
}

const ProductContext = createContext(initialState);


export const AllProducts = ({ children }) => {

    const [query] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]);
    const searchQuery = query.get('search');


    const [cart, setCart] = useState(initialState.cart); 

    console.log(cart);

    const cartItemCount = () => cart.reduce((acc, item) => acc + item.quantity, 0);
    

    const addToCart = (product) => {
        const productIdx = cart.findIndex(item => item.product.id === product.id);

        if (productIdx !== -1) {
            increaseQuantity(product.id);
        } else {
            setCart([...cart, { product, quantity: 1 }]);
        }
    }


    const removeFromCart = (id) => setCart(pre => pre.filter(item => item.product.id !== id))
    

    const increaseQuantity = (id) => {

        const copyCart = cart.slice();
        const productIdx = copyCart.findIndex(item => item.product.id === id);

        if (productIdx !== -1) {
            copyCart[productIdx].quantity += 1;
            setCart(copyCart);
        }
    }


    const decreaseQuantity = (id) => {

        const copyCart = cart.slice();
        const productIdx = copyCart.findIndex(item => item.product.id === id);

        if (productIdx !== -1 && copyCart[productIdx].quantity > 1) {
            copyCart[productIdx].quantity -= 1;
            setCart(copyCart);
        }
    }




    useEffect(() => {

        const fetchProducts = async () => {
            setLoading(true);

            const allLocalStorageProduct = JSON.parse(localStorage.getItem('allProducts'));

            if (allLocalStorageProduct) {
                setAllProducts(allLocalStorageProduct);
            } else {
                const products = searchQuery
                    ? await FakeStoreApi.fetchProductBySearch(searchQuery)
                    : await FakeStoreApi.fetchAllProduct()

                setAllProducts(products);
                localStorage.setItem('allProducts', JSON.stringify(products))
            }

            setLoading(false);
        }

        fetchProducts().catch(console.error);
    }, [searchQuery]);



    return (

        <ProductContext.Provider value={{
            loading,
            searchQuery,
            allProducts,
            cart,
            addToCart,
            cartItemCount,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
        }}>
            {
                children
            }
        </ProductContext.Provider>
    )
}


export const useProductContext = () => useContext(ProductContext);