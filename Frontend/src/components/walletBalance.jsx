import React from "react";

const WalletBalance = () => {
  return (
    <div>
      <div className="flex flex-row items-center mt-2 justify-between">
        <div className="flex flex-row items-center pb-2 pt-2">
          <img src="/tdesign_money.png" alt="" />
          <p className="text-sm text-[#101010] ml-2">WALLET BALANCE</p>
        </div>

        <img className="cursor-pointer" src="/eye.png" alt="" />
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold p-1 text-[#159212]">#0.00</p>
      </div>

      <div className="flex mt-42flex-row items-center justify-center">
        <button className="text-[14px] text-[#B673CE] cursor-pointer p-2">View History</button>
      </div>
    </div>
  );
};

export default WalletBalance;
