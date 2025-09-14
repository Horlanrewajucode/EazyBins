import React from 'react'

const card = ({images, title, desc, buttonText, buttonColor}) => {
  return (
    <div className='border-0 border-r-1 border-b-1 border-gray-400 shadow-md rounded-lg p-5 mt-4 flex flex-col justify-between max-w-md '>
        <h3 className='leading-4 w-30 text-[19px]'>{title}</h3>
        <img src={images} className='w-[200px] mt-16 mx-auto ' alt={images} />
        <p className='w-45 text-gray-600 text-sm mt-6 leading-tight tracking-normal '>{desc}</p>
        <button className={`${buttonColor} text-white  mt-4 mx-auto py-2 w-[12rem] rounded-lg `}>
        {buttonText }</button>

    </div>
  );
};

export default card;