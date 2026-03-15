import React from 'react'
import DealerCard from '@/components/DealerCard'
import MarketLogo from '@/public/MarketLogo.jpg'
const dealerData = [
    {
        name: "Green Grocers",
        logo: "MarketLogo.jpg",
        since: "2018",
        location: "San Francisco",
        rate: 4.9,
        sales: "2.5k",
        saved: "98",
        categories: ["Vegetables", "Fruits"],
        borderColor: "border-t-green-500"
    },
    {
        name: "City Bakery",
        logo: "MarketLogo.jpg", 
        since: "2015",
        location: "New York",
        rate: 4.7,
        sales: "1.2k",
        saved: "95",
        categories: ["Bread", "Pastries"],
        borderColor: "border-t-orange-500"
    },
    {
        name: "Organic Hub",
        logo: "MarketLogo.jpg",
        since: "2020",
        location: "Austin",
        rate: 4.8,
        sales: "3.8k",
        saved: "99",
        categories: ["Organic", "Dairy"],
        borderColor: "border-t-blue-500"
    }
];

const DealerSection = () => {
    return (
        <section className='bg-muted py-16 px-4'>

            <div className='text-center mb-12 max-w-2xl mx-auto'>
                <h2 className='text-3xl font-bold text-foreground mb-4'>Trusted Dealers</h2>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                    We partner with certified local businesses committed to reducing food waste while providing quality products.
                </p>
            </div>

            
            <div className='flex flex-wrap gap-15 justify-center max-w-7xl mx-auto'>
                {dealerData.map((dealer, index) => (
                    <DealerCard key={index} {...dealer} />
                ))}
            </div>
        </section>
    );
};

export default DealerSection;