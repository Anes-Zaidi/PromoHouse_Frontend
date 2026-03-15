import React from 'react';

interface DealerProps {
    logo: string;
    name: string;
    since: string;
    location: string;
    rate: number;
    sales: string;
    saved: string;
    categories: string[];
    borderColor: string;
}

const DealerCard: React.FC<DealerProps> = ({ logo, name, location, rate, sales, saved, categories, borderColor, since }) => {
    return (
        <div className={`bg-white rounded-2xl shadow-sm border-t-4 ${borderColor} border-x border-b border-gray-100 p-6 w-full max-w-sm flex flex-col gap-6`}>
            
            {/* Header*/}
            <div className='flex justify-between items-start'>
                <div className='flex gap-3'>
                    <img src={logo} alt={name} className='w-14 h-14 rounded-full object-cover border border-gray-100 shadow-sm' />
                    <div>
                        <h3 className='text-foreground font-bold text-lg leading-tight'>{name}</h3>
                        <p className='text-muted-foreground text-xs mt-1'>Since {since} • {location}</p>
                    </div>
                </div>
                <div className='flex items-center gap-1 bg-brand-success-bg text-brand-success-text text-[10px] font-bold px-2 py-1 rounded-md'>
                    <span className="text-xs">✱</span> Verified
                </div>
            </div>

            <hr className='border-gray-50' />

            {/* L'etat */}
            <div className='flex justify-between text-center px-2'>
                <div>
                    <p className='text-foreground font-bold text-base'>{rate}</p>
                    <p className='text-muted-foreground text-[10px] uppercase tracking-wider font-medium'>Rating</p>
                </div>
                <div>
                    <p className='text-foreground font-bold text-base'>{sales}</p>
                    <p className='text-muted-foreground text-[10px] uppercase tracking-wider font-medium'>Sales</p>
                </div>
                <div>
                    <p className='text-foreground font-bold text-base'>{saved}%</p>
                    <p className='text-muted-foreground text-[10px] uppercase tracking-wider font-medium'>Saved</p>
                </div>
            </div>

                {/*Categories */}
            <div className='flex items-center gap-2 flex-wrap'>
                <span className='text-muted-foreground text-[10px] font-bold uppercase'>Top Categories:</span>
                {categories.map((cat, index) => (
                    <span key={index} className="bg-muted text-muted-foreground text-[10px] px-3 py-1 rounded-md border border-border">
                        {cat}
                    </span>
                ))}
            </div>
                {/*boutton  Vert*/}
            <button className="w-full py-3 border-2 border-brand-primary text-brand-primary font-bold rounded-xl hover:bg-brand-primary hover:text-white transition-all duration-200">
                View Profile
            </button>
        </div>
    );
};

export default DealerCard;