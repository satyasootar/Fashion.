import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const LastestCollection = () => {
    const { products } = useContext(ShopContext)
    console.log("products: ", products);
    return (
        <div>LastestCollection</div>
    )
}

export default LastestCollection