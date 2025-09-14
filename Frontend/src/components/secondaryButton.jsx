import React from 'react'

const SecondaryButton = ({buttonText, buttonColor}) => {
  return (
   <button className={`${buttonColor} text-[#B673CE]  py-2 px-3 rounded-lg `}>
        {buttonText }


    </button>
  )
}

export default SecondaryButton