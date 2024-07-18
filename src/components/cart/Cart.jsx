import React, { useEffect } from "react";
// icons
import { HiArrowNarrowLeft } from "react-icons/hi";

import { useNavigate } from "react-router-dom";
// store
import { useSelector } from "react-redux";
import CartList from "./CartList";
import Swal from "sweetalert2";

const Cart = () => {
  const cart = useSelector((state) => state.products.cart);
  const [totalPrice, setTotalPrice] = React.useState(0);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    setTotalPrice(total);
  }, [cart]);

  const navigate = useNavigate();
  return (
    <main className="main__content">
      <section className="pb-[100px]">
        <div className="container pt-[75px] border-t-[3px] ">
          <p
            onClick={() => navigate("/products")}
            className="flex items-center gap-[9px] mb-[53px] font-readexPro text-[18px] leading-[23px] font-semibold cursor-pointer"
          >
            <HiArrowNarrowLeft /> Back to Shopping
          </p>
          <h2 className="text-darkGreen font-hammersmithOne text-[32px] leading-[40px] pl-[15px] mb-[56px]">
            SHOPPING CART
          </h2>
          <ul className="grid grid-cols-[1fr_428px] gap-[26px]">
            <li className="border-y-4 border-dashed">
              <ol>
                <li className="pl-[42px] pr-[32px] pt-[13px] pb-[7px] flex items-center justify-between">
                  <p className="font-hammersmithOne text-[22px] leading-[28px]">
                    Product
                  </p>
                  <div className="flex items-center gap-[150px]">
                    <p className="font-hammersmithOne text-[22px] leading-[28px]">
                      Quantity
                    </p>
                    <p className="font-hammersmithOne text-[22px] leading-[28px]">
                      Price
                    </p>
                  </div>
                </li>
                {cart.map((product) => (
                  <CartList key={product.id} product={product} />
                ))}
                {cart.length === 0 && (
                  <div role="alert" className="alert mt-[30px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-info h-6 w-6 shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span className="font-bold text-[25px]">
                      No products found
                    </span>
                  </div>
                )}
              </ol>
            </li>
            <li className="h-full border-l-4 pl-[32px]">
              <h4 className="font-hammersmithOne text-[32px] text-darkGreen pb-[12px] border-b-[3px] border-dashed leading-[40px]">
                CART TOTALS
              </h4>
              <div className="py-[40px] border-b-[3px] border-dashed">
                <p className="font-readexPro text-[18px] leading-[23px] font-light opacity-80 mb-[20px] flex justify-between items-center">
                  Shipping (3-5 Business Days)
                  <span className="font-readexPro text-[18px] font-medium leading-[23px]">
                    Free
                  </span>
                </p>
                <p className="font-readexPro text-[18px] leading-[23px] font-light opacity-80 mb-[20px] flex justify-between items-center">
                  TAX
                  <span className="font-readexPro text-[18px] font-medium leading-[23px]">
                    ${0}
                  </span>
                </p>
                <p className="font-readexPro text-[18px] leading-[23px] font-light opacity-80 flex justify-between items-center">
                  Subtotal{" "}
                  <span className="font-readexPro text-[18px] font-medium leading-[23px]">
                    ${totalPrice}
                  </span>
                </p>
              </div>
              <div className="py-[34px]">
                <p className="flex items-center justify-between mb-[60px] font-readexPro text-[18px] leading-[23px] font-medium">
                  Total <span>${totalPrice}</span>
                </p>
                <button
                  disabled={cart.length === 0}
                  onClick={() => {
                    Swal.fire({
                      icon: "question",
                      title: "Are you sure?",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate("/checkout");
                      }
                    });
                  }}
                  className="py-[17px] px-[40px] bg-green w-full rounded-[10px] font-inter font-bold text-[22px] leading-[27px] text-white hover:bg-lightGreen hover:text-darkGreen transition"
                >
                  Proceess to Checkout
                </button>
                <p
                  onClick={() => navigate("/products")}
                  className="flex items-center gap-[9px] mb-[53px] font-readexPro mt-[40px] justify-center text-[18px] leading-[23px] font-semibold cursor-pointer"
                >
                  <HiArrowNarrowLeft /> Back to Shopping
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Cart;
