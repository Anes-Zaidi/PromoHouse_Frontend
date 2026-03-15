import React from 'react'
import CommentCart from '@/components/CommentCart'
import userpic from '@/public/userpic.jpg'
const commentData =[
  {
    stars: 5,
    comment: "PromoHouse has changed how I shop for groceries. I save at least $200 a month and I feel great about reducing food waste.",
    image: userpic.src,
    name: "Annette Black",
    role: "Teacher",
    bgColor: "bg-yellow-50/50"

  } , {
    stars : 4 , comment : "The quality of food is surprisingly good. Most items are just near the best-before date but perfectly fine to eat. Highly recommend!" ,
    image : userpic.src , 
    name :"Ralph Edwards" ,
    role:"Chef" ,
    bgColor :"bg-green-50/50"
  },
  {
    stars : 5 ,
    image : userpic.src ,
    comment :"Fast delivery and great customer service. The app is super easy to use to find deals near my workplace." ,
    name :"Jane Cooper" ,
    role :"Student",
    bgColor :"bg-red-50/50"
  }
]



const CommentSection = () => {
  return (
    <section className='bg-white py-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl md:text-4xl font-extrabold text-foreground text-center mb-16'>What Our Customers Say</h2>
        <div className='flex flex-wrap justify-center gap-8'>
          {commentData.map((comment, index)=>(
            <CommentCart key={index} {...comment}/>
          ))}
        </div>
      </div>

    </section>
  )
}

export default CommentSection