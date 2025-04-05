import { createContext, useEffect, useState } from "react"
import { products } from '../assets/assets'
import { toast } from "react-toastify";

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId, size) => {

        let cartData = structuredClone(cartItems)

        if (!size) {
            toast.error("Select Product Size")
            return;
        }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }

        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)
        toast.success("Sucessfully Added")
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const quantity = cartItems[itemId][size];
                if (quantity > 0) totalCount += quantity;
            }
        }
        return totalCount;
    };

    const value = {
        products, delivery_fee, currency,
        search, setSearch, showSearch, setShowSearch, 
        cartItems, addToCart, getCartCount
    }


    return (
        <ShopContext.Provider value={value} >
            {children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider;