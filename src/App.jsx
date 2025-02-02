import React, { useEffect, useState } from "react";

// store
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./store/productsSlice.js";

// components
import {
  Home,
  Products,
  SingleProduct,
  Cart,
} from "./components/CombineComponents";

// react-icons & img
import { FiPhoneCall } from "react-icons/fi";
import usaIcon from "./assets/header-USA.svg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { LuSearch } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";
import Twitter from "./assets/twitter.svg";
import Facebook from "./assets/facebook.svg";
import Instagram from "./assets/insta.svg";
import IN from "./assets/IN.svg";
import FooterIcon from "./assets/footer-bottom.svg";
import { IoCloseSharp } from "react-icons/io5";

// react-router-dom
import { Routes, Route, NavLink, Link } from "react-router-dom";
import Checkout from "./components/checkout/checkout.jsx";

const App = () => {
  const dispatch = useDispatch();
  const { cartCount } = useSelector((state) => state.products);

  const [showAdvertisement, setShowAdvertisement] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("examCart")) || [];
    dispatch(setCart(cart));
  }, []);

  // har safar search qilinguncha products'larni turgan page'dan topilgan datalar qaytadi

  return (
    <>
      <header className=" bg-white">
        {showAdvertisement && (
          <div className="fixed -top-0 w-full z-10 bg-darkGreen py-[19px]">
            <ul className="container flex justify-between items-center">
              <li className="flex gap-[40px]">
                <h2 className="font-nicomoji text-white text-[30px] leading-[30px]">
                  <Link to="/">GG</Link>
                </h2>
                <a
                  href="tel:+123456789"
                  className="text-white flex items-center gap-[14px]"
                >
                  <FiPhoneCall className="text-[18px] font-semibold" />
                  +4904-049-950
                </a>
              </li>
              <li className="cursor-pointer">
                <p className="text-white flex gap-[25px] text-[14px] leading-[17px]">
                  Get 50% Off on the Selected items
                  <span className="inline-block h-[22px] w-[2px] bg-lightGreen"></span>{" "}
                  Shop now
                </p>
              </li>
              <li className="flex gap-[45px] items-center">
                <div className="dropdown dropdown-hover">
                  <div
                    tabIndex={0}
                    className="flex gap-[7px] items-center cursor-pointer"
                  >
                    <MdKeyboardArrowDown className="text-white" />
                    <span className="font-inter text-white text-[17px] leading-[20px] font-medium">
                      English
                    </span>
                    <img src={usaIcon} alt="svg" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-slimGreen rounded-box z-[1] w-36 p-2 shadow"
                  >
                    <li>
                      <a>English (Eng)</a>
                    </li>
                    <li>
                      <a>Русский (Рус)</a>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-[7px] items-center">
                  <TbWorld className="text-white w-[20px] h-[20px]" />
                  <span className="font-inter text-white text-[17px] leading-[20px] font-medium">
                    Location
                  </span>
                </div>
                <IoCloseSharp
                  onClick={() => setShowAdvertisement(false)}
                  className="text-white cursor-pointer text-[24px] inline"
                />
              </li>
            </ul>
          </div>
        )}
        <div
          className={
            showAdvertisement
              ? "container mt-[68px] py-[30px] flex justify-between border-b-[2px] px-[20px]"
              : "container py-[30px] flex justify-between border-b-[2px] px-[20px]"
          }
        >
          <h3 className="font-nicomoji text-[30px] leading-[30px]">
            <Link to="/">GameGeek</Link>
          </h3>
          <ul className="flex gap-[40px] items-center">
            <li className="text-darkGreen font-inter text-[16px] font-medium leading-[19px]">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-lightGreen font-bold" : ""
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="text-darkGreen font-inter text-[16px] font-medium leading-[19px]">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-lightGreen font-bold" : ""
                }
                to="/products"
              >
                Products
              </NavLink>
            </li>
          </ul>
          <div className="flex items-center gap-[44px]">
            {showSearch ? (
              <label className="input input-bordered flex items-center gap-2 px-[6px] h-[28px]">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="grow"
                  placeholder="Search"
                />
                <IoCloseSharp
                  onClick={() => {
                    setSearch("");
                    setShowSearch(false);
                  }}
                  className="text-darkGreen text-[22px] cursor-pointer"
                />
              </label>
            ) : (
              <LuSearch
                className="text-darkGreen w-[20px] h-[20px] cursor-pointer"
                onClick={() => setShowSearch(true)}
              />
            )}
            <LuUser className="text-darkGreen w-[20px] h-[20px] cursor-pointer" />
            <Link to="/cart">
              <div className="relative">
                <LuShoppingCart className="text-darkGreen w-[20px] h-[20px]" />
                {cartCount !== 0 && (
                  <span className="absolute -top-2 -right-2 w-[16px] h-[16px] rounded-full bg-lightGreen flex justify-center items-center text-[10px] text-white">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <Products
              search={search}
              setSearch={setSearch}
              setShowSearch={setShowSearch}
            />
          }
        />
        <Route
          path="/products/:id"
          element={
            <SingleProduct
              setSearch={setSearch}
              setShowSearch={setShowSearch}
            />
          }
        />
        <Route
          path="/cart"
          element={<Cart setSearch={setSearch} setShowSearch={setShowSearch} />}
        />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <footer className="bg-darkGreen">
        <div className="container">
          <div className="flex justify-between pt-[70px] pb-[56px] border-b-2 border-white border-opacity-50 px-[40px]">
            <div className="w-[190px]">
              <h3 className="font-nicomoji  text-white text-[30px] leading-[30px] mb-[15px]">
                Game Geek
              </h3>
              <p className="footer_text mb-[145px]">
                START YOUR GAME WITH THE BEST
              </p>
              <ul className="flex gap-[22px] items-center">
                <li className="cursor-pointer">
                  <img src={Twitter} alt="svg" />
                </li>
                <li className="cursor-pointer">
                  <img src={IN} alt="svg" />
                </li>
                <li className="cursor-pointer">
                  <img src={Facebook} alt="svg" />
                </li>
                <li className="cursor-pointer">
                  <img src={Instagram} alt="svg" />
                </li>
              </ul>
            </div>
            <ul className="flex gap-[125px]">
              <li className="flex">
                <ol className="flex flex-col gap-[19px]">
                  <li className="text-white font-inter font-bold text-[24px] leading-[29px] mb-[10px]">
                    Services
                  </li>
                  <li className="text-white font-inter text-[18px] leading-[22px] opacity-85">
                    Gift Card
                  </li>
                  <li className="text-white font-inter text-[18px] leading-[22px] opacity-85">
                    Mobile App
                  </li>
                  <li className="text-white font-inter text-[18px] leading-[22px] opacity-85">
                    Shipping & Delivery
                  </li>
                  <li className="text-white font-inter text-[18px] leading-[22px] opacity-85">
                    Order Pickup
                  </li>
                  <li className="text-white font-inter text-[18px] leading-[22px] opacity-85">
                    Account Signup
                  </li>
                </ol>
              </li>
              <li className="flex">
                <ol className="flex flex-col gap-[19px]">
                  <li className="text-white font-inter font-bold text-[24px] leading-[29px] mb-[10px]">
                    Help
                  </li>
                  <li className="text-white font-inter text-[18px] leading-[22px] opacity-85">
                    ShopCart Help
                  </li>
                  <li className="text-white font-inter text-[18px] leading-[22px] opacity-85">
                    Returns
                  </li>
                  <li className="text-white font-inter text-[18px] leading-[22px] opacity-85">
                    Track Orders
                  </li>
                  <li className="text-white font-inter text-[18px] leading-[22px] opacity-85">
                    Contact Us
                  </li>
                  <li className="text-white font-inter text-[18px] leading-[22px] opacity-85">
                    Feedback
                  </li>
                  <li className="text-white font-inter text-[18px] leading-[22px] opacity-85">
                    Security & Fraud
                  </li>
                </ol>
              </li>
              <li className="flex">
                <ol className="flex flex-col gap-[19px]">
                  <li className="text-white font-inter font-bold text-[24px] leading-[29px] mb-[10px]">
                    About Us
                  </li>
                  <li className="text-white font-inter text-[18px] leading-[22px] opacity-85">
                    News & Blog
                  </li>
                  <li className="text-white font-inter text-[18px] leading-[22px] opacity-85">
                    Help
                  </li>
                  <li className="text-white font-inter text-[18px] leading-[22px] opacity-85">
                    Press Center
                  </li>
                </ol>
              </li>
            </ul>
          </div>
          <ul className="py-[32px] px-[40px] flex items-center justify-between">
            <li className="cursor-pointer">
              <Link
                className="font-nicomoji text-white text-[30px] leading-[30px]"
                to="/"
              >
                GG
              </Link>
            </li>
            <li className="flex items-center gap-[18px] cursor-pointer">
              <img src={FooterIcon} alt="svg" />
              <p className="font-inter text-[18px] leading-[22px] font-semibold text-white">
                Help Center
              </p>
            </li>
            <li className="cursor-pointer">
              <p className="font-inter text-[18px] leading-[22px] font-semibold text-white">
                Privacy & Policy
              </p>
            </li>
            <li className="cursor-pointer">
              <p className="font-inter text-[18px] leading-[22px] font-semibold text-white">
                Terms of Service
              </p>
            </li>
            <li className="cursor-pointer">
              <p className="font-inter text-[18px] leading-[22px] font-semibold text-white flex items-center gap-[10px]">
                All rights reserved by
                <span className="font-nicomoji"> GameGeek </span>
                <span className="inline-block h-[16px] w-[2px] bg-white"></span>
                2023
              </p>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default App;
