import React from 'react'
import GooglePlay from '@/public/GooglePlay.png'
import AppStore from '@/public/AppStore.png'
import MobileApp from '@/public/MobileApp.jpg'

const Banner = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='relative overflow-hidden rounded-3xl bg-linear-to-r from-red-600 to-orange-500 p-8 md:p-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-10'>
            
            {/* Partie Texte */}
            <div className='text-white max-w-xl z-10 text-center md:text-left'>
                <h2 className='text-3xl md:text-5xl font-bold leading-tight mb-6'>
                    Make your shopping easier with our mobile app
                </h2>
                <p className='text-orange-50 text-sm md:text-lg mb-10 opacity-90'>
                    Get notifications for new deals near you instantly. Available on iOS and Android.
                </p>

                {/* Boutons - Correction de flex-wrap */}
                <div className='flex flex-wrap gap-4 justify-center md:justify-start'>
                    <button className='bg-black hover:bg-gray-900 transition-colors p-1 rounded-xl'>
                        <img src="GooglePlay.png" alt="Google Play" className='h-10 md:h-12' />
                    </button>
                    <button className='bg-black hover:bg-gray-900 transition-colors p-1 rounded-xl'>
                        <img src="AppStore.png" alt="App Store" className='h-10 md:h-12' />
                    </button>
                </div>
            </div>

            {/* Partie Image - On limite la hauteur ici */}
            <div className='relative z-10 w-full max-w-70 md:max-w-87.5'>
                <div className='bg-gray-900/10 backdrop-blur-md rounded-[2.5rem] p-3 shadow-2xl'>
                    <img 
                        src="MobileApp.jpg" 
                        alt="Mobile App" 
                        className='w-full h-auto max-h-100 object-contain rounded-[2rem]' 
                    />
                </div>
            </div>

    
            <div className='absolute top-[-10%] right-[-5%] w-64 h-64 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl'></div>
        </div>
    </div>
  )
}

export default Banner