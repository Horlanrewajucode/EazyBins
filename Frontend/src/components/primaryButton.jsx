import React from 'react'

const PrimaryButton = ({buttonText, buttonColor}) => {
  return (
    <button className={`${buttonColor} text-white  py-2 px-3 rounded-lg `}>
        {buttonText }


    </button>
  )
}

export default PrimaryButton;