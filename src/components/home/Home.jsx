import React from "react";
import { Link } from "react-router-dom";

// icons & imgs
import { GiCheckMark } from "react-icons/gi";
import imgItem1 from "/home_item(1).jpeg";
import imgItem2 from "/home_item(2).jpeg";
import imgItem3 from "/home_item(3).jpeg";
import svgItem1 from "../../assets/home1.svg";
import svgItem2 from "../../assets/home2.svg";
import svgItem3 from "../../assets/home3.svg";

const Home = () => {
  return (
    <main className="main__content">
      <section className="pt-[127px] pb-[95px] bg-cover bg-no-repeat bg-center bg-[url('/hero.png')]">
        <div className="container">
          <div className="px-[115px]">
            <h2 className="hero_text w-[530px] mb-[23px]">
              START YOUR GAME WITH THE BEST
            </h2>
            <p className="font-readexPro text-white text-[18px] leading-[23px] opacity-80 mb-[40px]">
              We've Got Everything
              <span className="block">You Need for Gaming Supremacy</span>
            </p>
            <button className="py-[17px] px-[120px] bg-lightGreen rounded-[10px] font-inter font-bold text-[22px] leading-[27px] text-white hover:bg-white hover:text-darkGreen transition mb-[30px]">
              <Link to="/products">Shop</Link>
            </button>
            <ul className="flex flex-col gap-[20px]">
              <li className="flex">
                <GiCheckMark className="text-white text-[22px] mr-[25px]" />
                <p className="font-hammersmithOne text-[22px] leading-[28px] text-white w-[300px]">
                  MORE THAN <span className="text-green">15+</span> POPULAR
                  PROFESSIONAL
                  <span className="text-green block"> BRANDS</span>
                </p>
              </li>
              <li className="flex">
                <GiCheckMark className="text-white text-[22px] mr-[25px]" />
                <p className="font-hammersmithOne text-[22px] leading-[28px] text-white w-[300px]">
                  <span className="text-green">2500+</span> ITEMS
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-darkGreen pt-[70px] pb-[80px]">
        <div className="container px-[115px]">
          <h3 className="font-hammersmithOne text-center text-[30px] leading-[38px] text-white mb-[75px]">
            Discover news and innovations
          </h3>
          <ul className="flex justify-between">
            <li className="w-[305px]">
              <img src={imgItem1} alt="img" />
              <h4 className="mt-[27px] mb-[15px] font-hammersmithOne text-[23px] leading-[29px] uppercase text-white">
                Always in the Game
              </h4>
              <p className="font-readexPro text-white text-[18px] leading-[23px]">
                Stay ahead of the latest and greatest gaming tech, featuring new
                releases, exclusive deals, and exciting pre-orders.
              </p>
              <span className="font-readexPro text-[18px] font-medium leading-[23px] text-white block underline cursor-pointer mt-[18px]">
                See More
              </span>
            </li>
            <li className="w-[305px]">
              <img src={imgItem2} alt="img" />
              <h4 className="mt-[27px] mb-[15px] font-hammersmithOne text-[23px] leading-[29px] uppercase text-white">
                Enhance Your Experience
              </h4>
              <p className="font-readexPro text-white text-[18px] leading-[23px]">
                Upgrade Your World by Elevating your setup and personalize your
                space with our collection of stylish and functional gaming
                accessories.
              </p>
              <span className="font-readexPro text-[18px] font-medium leading-[23px] text-white block underline cursor-pointer mt-[18px]">
                See More
              </span>
            </li>
            <li className="w-[305px]">
              <img src={imgItem3} alt="img" />
              <h4 className="mt-[27px] mb-[15px] font-hammersmithOne text-[23px] leading-[29px] uppercase text-white">
                Command the Battle!
              </h4>
              <p className="font-readexPro text-white text-[18px] leading-[23px]">
                Take control with our diverse range of gaming
                keyboards, featuring mechanical switches for tactile feedback
                etc.
              </p>
              <span className="font-readexPro text-[18px] font-medium leading-[23px] text-white block underline cursor-pointer mt-[18px]">
                See More
              </span>
            </li>
          </ul>
        </div>
      </section>
      <section className="py-[73px]">
        <div className="container px-[60px]">
          <h3 className="font-hammersmithOne uppercase text-center text-[30px] leading-[38px] text-darkGreen mb-[75px]">
            Everything you need is <span className="text-green">here</span>
          </h3>
          <ul className="flex justify-between items-center">
            <li className="flex items-center gap-[34px]">
              <img src={svgItem1} alt="svg" className="cursor-pointer" />
              <p className="font-readexPro text-[20px] leading-[25px] font-light w-[230px]">
                <span className=" font-bold">24/7 support</span> online
                consultation
              </p>
            </li>
            <li className="w-[3px] h-[50px] bg-lightGreen inline-block"></li>
            <li className="flex items-center gap-[34px]">
              <img src={svgItem2} alt="svg" className="cursor-pointer" />
              <p className="font-readexPro text-[20px] leading-[25px] font-light w-[190px]">
                <span className=" font-bold">Free delivery</span> on orders from
                39$
              </p>
            </li>
            <li className="w-[3px] h-[50px] bg-lightGreen inline-block"></li>
            <li className="flex items-center gap-[34px]">
              <img src={svgItem3} alt="svg" className="cursor-pointer" />
              <p className="font-readexPro text-[20px] leading-[25px] font-light w-[360px]">
                <span className="font-bold">Easy Returns</span> and{" "}
                <span className="font-bold">30-day</span> money back guaranty.
                <span className="font-medium underline">More information</span>
              </p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Home;
