import React from 'react'
interface CommentProps {
    stars:number , comment : string , image : string , name : string , role :string , bgColor:string
}


const CommentCart:React.FC<CommentProps> = ({stars , comment , image , name , role , bgColor}) => {
  return (
    <div className={`${bgColor} rounded-2xl p-8 flex flex-col gap-6 shadow-sm border border-white/20 w-full max-w-sm`}>
     <div className='flex text-yellow-400 gap-1'>
        {"★".repeat(stars)}
     </div>
        <p className='flex items-center gap-3 mt-4'>"{comment}"</p>
       <div className='flex items-center gap-3 mt-4'>
        <img src={image} alt={name} className='w-12 h-12 rounded-full object-cover shadow-sm' />
        <div>
             <h4 className='text-gray-900 font-bold text-sm leading-tight'>{name}</h4>
             <p className='text-gray-500 text-xs'>{role}</p>
        </div>
       </div>
    </div>
  )
}

export default CommentCart