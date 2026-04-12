'use client';
import Link from 'next/link';
import NextImage from 'next/image';
import {Search , Bell , Bookmark} from 'lucide-react' ;



function NavBarDeals() {
  return (
   <nav className="bg-white border-b border-gray-100 py-3 px-6 flex items-center justify-between sticky top-0 z-50">
        {/*LOGO */}
         <Link href="/" className='flex items-center gap-2'>
          <div className='relative w-10 h-10'>
           <NextImage 
           src="/logo3.png" alt='PromoHouse Logo' fill className='object-contain'/>
          </div>
          <span className='font-bold text-xl text-gray-900 tracking-tight'>PromoHouse</span>
         </Link>
        {/*Search Bar*/}
          <div className='hidden md:flex grow max-w-md mx-8 relative'>
            <div className=' absolute inset-y-0 left-4 flex items-center pointer-events-none'>
                <Search className="h-4 w-4 text-gray-400"></Search>

            </div>
            <input type="text" className='block w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-[#22C55E] focus:ring-2 focus:border-transparent transition-all'  placeholder='Search for deals, brands, or categories'/>
            </div>
        {/*User Icons*/}

        <div className='flex items-center gap-6'>
            {/*Lien de Navigation*/}
            <div className='hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-600' >
              <Link href="/deals" className='hover:text-gray-900'>Deals</Link>
              <Link href="/categories" className='hover:text-gray-900'>Categories</Link>
              <Link href="/stores" className='hover:text-gray-900'>Stores</Link>
              <Link href="/trending" className="text-[#22C55E]">Trending</Link>
            </div>
            {/*Icones*/}
            <div className='flex items-center gap-4 border-l pl-6 border-gray-100'>
                 <button className='text-gray-400 hover:text-gray-900 relative p-1'>
                    <Bell className='w-5 h-5'/>
                    <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white'></span>
                 </button>
                 <button className='text-gray-400 hover:text-gray-900 p-1'>
                    <Bookmark className='w-5 h-5'/>
                 </button>
                 {/*User*/}
                 <div className="w-9 h-9 rounded-full bg-gray-100 overflow-hidden border border-gray-200 relative cursor-pointer">
            <NextImage 
              src="/UserAvatar.jpg" 
              alt="User profile"
              fill
              className="object-cover"
            />
          </div>
                
            </div>
        </div>

   </nav>
  )
}

export default NavBarDeals
