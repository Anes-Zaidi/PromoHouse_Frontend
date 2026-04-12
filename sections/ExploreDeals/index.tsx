"use client" ;
import React from 'react'
import { useState } from 'react'
import Cart from '@/components/Cart'
import Organic from '@/public/Organic.jpg'
import Pain from '@/public/Pain.jpg'
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories =["All Deals", "Fruits & Veg" ,"Bakery" , "Dairy & Eggs" , "Meat & Seafood" , "Pantry" ,"Beverages"] ;

const ExploreDeals = () => {
    const [activeCategory , setActiveCategory] = useState("All Deals");
    return (
    <section className='max-w-7xl mx-auto px-4  py-12'>
        {/*La barre */}
        <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold text-foreground '>Explore Categories</h2>
            <div className='flex gap-2'>
            <button className='w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-background hover:shadow-md transition-all'><ChevronLeft size={20}/></button>
            
            <button className='w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-background hover:shadow-md transition-all'><ChevronRight size={20}/></button>

            </div>
        </div>
        {/* barre des categories*/}
        <div className='flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-hide'>
        {categories.map((cat) => (
            <button key={cat} onClick={()=>setActiveCategory(cat)} className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${activeCategory === cat ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/25 ' : 'bg-background text-muted-foreground border-border hover:border-border' }`}>{cat}</button>
        ))}

        </div>
            {/*Products*/}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
            <Cart image='Organic.jpg' discount='50%' timeLeft='2 days' shopName='Whole Foods Market' title='Organic Vegetable Budle Box' rate={4} reviews={120} currentPrice='10.00' oldPrice='20.00'/>
            <Cart image='Pain.jpg' discount='50%' timeLeft='2 days' shopName='Whole Foods Market' title='Organic Vegetable Budle Box' rate={4} reviews={120} currentPrice='10.00' oldPrice='20.00'/>
            <Cart image='Organic.jpg' discount='50%' timeLeft='2 days' shopName='Whole Foods Market' title='Organic Vegetable Budle Box' rate={4} reviews={120} currentPrice='10.00' oldPrice='20.00'/>
            <Cart image='Pain.jpg' discount='50%' timeLeft='2 days' shopName='Whole Foods Market' title='Organic Vegetable Budle Box' rate={4} reviews={120} currentPrice='10.00' oldPrice='20.00'/>
            </div>
            <div className='flex justify-center'>
                <button className='px-8 py-3 border border-border rounded-full text-foreground font-semibold hover:bg-muted transition-colors'>
                    Load More Deals 
                </button>
            </div>
    </section>
    )
}

export default ExploreDeals