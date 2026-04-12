import React from 'react' ;
import Cart from '@/components/Cart';
import { title } from 'process';
import Organic from '@/public/Organic.jpg'
import Pain from '@/public/Pain.jpg'
const cartData=[
    {
        image : "Organic.jpg", 
        discount :"45%" ,
        timeLeft :"2 days",
        shopName :"Whole Foods Market",
        title :"Organic Vegetable Bundle Box",
        rate : 5 ,
        reviews : 45, 
        currentPrice:"12.99",
        oldPrice:"24.00"
    } ,
     {
        image : "Pain.jpg", 
        discount :"30%" ,
        timeLeft :"5 days",
        shopName :"Local Bakery",
        title :"Assorted Artisan Breads",
        rate: 4 ,
        reviews : 12, 
        currentPrice:"5.99",
        oldPrice:"8.50"
    } ,
        {
        image : "Organic.jpg", 
        discount :"45%" ,
        timeLeft :"2 days",
        shopName :"Whole Foods Market",
        title :"Organic Vegetable Bundle Box",
        rate : 5 ,
        reviews : 45, 
        currentPrice:"12.99",
        oldPrice:"24.00"
    } ,
     {
        image : "Pain.jpg", 
        discount :"30%" ,
        timeLeft :"5 days",
        shopName :"Local Bakery",
        title :"Assorted Artisan Breads",
        rate: 4 ,
        reviews : 12, 
        currentPrice:"5.99",
        oldPrice:"8.50"
    } 
]


const CartSection = () => {
  return (
    <section className='p-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center'>
            {cartData.map((item , index) =>(
                <Cart key={index} {...item} />
            ))}
        </div>
    </section>
  )
}

export default CartSection ;