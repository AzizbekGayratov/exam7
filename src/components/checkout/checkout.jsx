import React, { useEffect } from "react";
import CheckSvg from "../../assets/Checkout.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { proccessToCheckout } from "../../store/productsSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(proccessToCheckout());
  }, []);
  return (
    <main className="main__content">
      <div className="container">
        <div className="max-w-[690px] mx-auto py-[35px]">
          <img src={CheckSvg} alt="icon" className="mx-auto mb-[75px]" />
          <h3 className="font-hammersmithOne text-[48px] leading-[60px] text-center">
            Your Order is Confirmed!
          </h3>
          <div className="flex justify-center gap-[45px] items-center mt-[85px]">
            <button
              onClick={() => navigate("/")}
              className="py-[17px] px-[60px] bg-transparent rounded-[10px] font-inter font-bold text-[22px] leading-[27px] text-green border-[2px] border-green hover:bg-lightGreen hover:text-darkGreen transition"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate("/products")}
              className="py-[17px] px-[70px] bg-green rounded-[10px] font-inter font-bold text-[22px] leading-[27px] text-white hover:bg-lightGreen hover:text-darkGreen transition"
            >
              Shop More
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
