import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

export const BestSeller = () => {
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestseller] = useState([])
    console.log("bestSeller: ", bestSeller);


    useEffect(() => {
        const bestProduct = products.filter((ele) => ele.bestseller)
        setBestseller(bestProduct.slice(0, 5))
    }, [])
    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8' >
                <Title text1={"BEST"} text2={"SELLERS"} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base O text-gray-600' >
                    Dummy Text
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6' >
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}
