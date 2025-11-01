import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
function CartPage() {
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen bg-[#E0E7FF] flex justify-center p-6">
      <div className="w-full max-w-[800px]">
        <div className="flex items-center gap-[20px] mb-6 ">
          <div className=" z-[10] " onClick={() => navigate("/")}>
            <IoIosArrowRoundBack size={35} className="text-[#4F46E5]" />
          </div>
          <h1 className='"text-2xl font-bold  text-start'>Your Cart</h1>
        </div>
        {cartItems?.length == 0 ? (
          <p className="text-gray-500 text-lg text-center">
            Your Cart is Empty
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems?.map((item, index) => (
                <CartItemCard data={item} key={index} />
              ))}
            </div>
            <div className="mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center border">
              <h1 className="text-lg font-semibold">Total Amount</h1>
              <span className="text-xl font-bold text-[#4F46E5]">
                ₹{totalAmount}
              </span>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-[#4F46E5] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#4338CA] transition cursor-pointer"
                onClick={() => navigate("/checkout")}
              >
                Proceed to CheckOut
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;

// Developed By Tarun Saxena
