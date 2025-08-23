import React from 'react'

const card = ({images, title, desc, buttonText, buttonColor}) => {
  return (
    <div className='shadow-md border rounded-lg p-5 flex flex-col justify-between max-w-md m-0'>
        <h3 className='leading-tight w-40 text-lg font-semibold mb-2'>{title}</h3>
        <img src={images} className='w-[200px] mb-5 mx-auto ' alt={images} />
        <p className='w-45 text-gray-600 text-sm mb-4 '>{desc}</p>
        <button className={`${buttonColor} text-white  mt-2 mx-auto py-2 w-[12rem] rounded-lg `}>
        {buttonText }</button>

    </div>
  );
};

export default card;