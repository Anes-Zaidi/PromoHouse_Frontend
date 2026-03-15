import React from 'react' ;
interface CartProps{
    image :string ;
    discount : string ;
    timeLeft : string ;
    shopName : string ;
    title : string ;
    rate:number ;
    reviews : number ;
    currentPrice :string ;
    oldPrice : string ;
}

const Cart:React.FC<CartProps>=({image , discount , timeLeft , shopName , title , rate , reviews , currentPrice , oldPrice}) => {
  return (
    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full max-w-70 group'>
        {/* Section de l'image */}
        <div className='relative h-48'>
            <img src={image} alt={title} className='w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105' />
            <div className='absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded z-10 '>
                -{discount} OFF
            </div>
            <div className='absolute top-2 right-2 bg-background/90 backdrop-blur-sm text-foreground text-[10px] px-2 py-1  rounded-full flex items-center gap-1 shadow-sm z-10'>
             🕒 {timeLeft} left
             </div>


        </div>
        {/*Section de Contenue */}
        <div className='p-4'>
            <p className="text-muted-foreground text-xs mb-1">{shopName}</p>
            <h3 className='text-foreground font-bold text-sm mb-2 truncate' >{title}</h3>
            {/*Rate */}
           <div className='flex items-center gap-2 mb-4 '>
            <div className='flex text-brand-warning text-xs'>
                {"★".repeat(Math.floor(rate))}
            </div>
                <span className='text-muted-foreground text-xs'>({reviews})</span>
             </div>
             {/*Prix et bouttoun */}
             <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <span className='text-foreground font-bold text-lg'>${currentPrice}</span>
                    <span className='text-muted-foreground line-through text-sm'>${oldPrice}</span>
                </div>
                <button className='bg-brand-success-bg text-brand-success-text w-8 h-8 rounded-full flex justify-center items-center font-bold hover:bg-brand-primary hover:text-white transition-colors' >+</button>

             </div>
        </div>
    </div>
  )
}

export default Cart ;