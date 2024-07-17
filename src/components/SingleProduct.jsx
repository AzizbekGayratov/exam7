import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/products";

// icons
import leftSvg from "../assets/SinglePageLeftArrow.svg";
import rightSvg from "../assets/SinglePageRightArrow.svg";
import { LuShoppingCart } from "react-icons/lu";
import LikeSvg from "../assets/SinglePageLike.svg";
import item1Svg from "../assets/SingleItem1.svg";
import item2Svg from "../assets/SingleItem2.svg";
import star1 from "../assets/1stars.svg";
import star2 from "../assets/2stars.svg";
import star3 from "../assets/3stars.svg";
import star4 from "../assets/4stars.svg";
import star5 from "../assets/5stars.svg";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const randomNum = Math.floor(Math.random() * 100);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setError(null);
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <>
      {error && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! {error}.</span>
        </div>
      )}
      {isLoading && (
        <span className="block mx-auto loading loading-spinner  w-[155px] h-[155px]"></span>
      )}
      {!isLoading && !error && (
        <main className="main__content">
          <section className="pb-[40px]">
            <div className="container pt-[100px] border-t-[3px]">
              <>
                <h3
                  className="cursor-pointer font-readexPro text-[20px] font-medium leading-[25px] opacity-75 mb-[42px]"
                  onClick={() => navigate(-1)}
                >
                  Products / {product.brand_name} / {product.name}
                </h3>
                <div className="flex gap-[40px]">
                  <div className="max-w-[700px]">
                    <div className="h-[700px] border-[0.5px] rounded-lg mb-[145px] relative">
                      <img
                        src={leftSvg}
                        alt="svg"
                        className="absolute top-[350px] transform translate-x-[50%]"
                      />
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full"
                      />
                      <img
                        src={rightSvg}
                        alt="svg"
                        className="absolute top-[350px] right-0 transform translate-x-[-50%]"
                      />
                    </div>
                    <ul className="flex items-center justify-between">
                      <li className="border-[0.5px] rounded-lg w-[114px] h-[114px]">
                        <img src={product.image_url} alt={product.name} />
                      </li>
                      <li className="border-[0.5px] rounded-lg w-[114px] h-[114px]">
                        <img src={product.image_url} alt={product.name} />
                      </li>
                      <li className="border-[0.5px] rounded-lg w-[114px] h-[114px]">
                        <img src={product.image_url} alt={product.name} />
                      </li>
                      <li className="border-[0.5px] rounded-lg w-[114px] h-[114px]">
                        <img src={product.image_url} alt={product.name} />
                      </li>
                      <li className="border-[0.5px] rounded-lg w-[114px] h-[114px]">
                        <img src={product.image_url} alt={product.name} />
                      </li>
                    </ul>
                  </div>
                  <div className="">
                    <div className="pb-[27px] border-b-2 border-dashed">
                      <h3 className="font-hammersmithOne text-[48px] leading-[60px] mb-[16px]">
                        {product.name}
                      </h3>
                      <p className="font-readexPro text-[18px] leading-[23px] font-medium mb-[19px]">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="">
                          <p className="">
                            {"⭐".repeat(Math.round(product.ratings_stars))}{" "}
                            {product.ratings_stars}/5 ({product.rating_counts})
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-[27px] border-t-2 border-dashed pb-[27px] border-b-2 ">
                      <h4 className="font-readexPro text-[38px] leading-[45px] font-bold mb-[15px]">
                        ${product.price} or 49.99/month
                      </h4>
                      <p className="font-readexPro text-[18px] leading-[23px] font-medium ">
                        Suggested payments with 6 month special financing
                      </p>
                    </div>
                    <div className="pt-[30px] border-t-2 border-dashed pb-[36px] border-b-2">
                      <p className="font-readexPro text-[24px] mb-[30px] leading-[30px] font-semibold">
                        Choose a color
                      </p>
                      <div className="flex items-center gap-[31px]">
                        {product.color_options.map((color, i) => (
                          <div
                            key={i}
                            className="w-[66px] h-[66px] rounded-full border-[2px] border-black cursor-pointer"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-[46px] border-t-2 border-dashed">
                      <div className="flex items-center gap-[62px] mb-[50px]">
                        <div className="gap-[30px] flex items-center justify-between py-[14px] px-[32px] border-[3px] border-green rounded-[40px]">
                          <button
                            onClick={() => setQuantity(quantity - 1)}
                            disabled={quantity === 1}
                            className="font-inter text-[26px] font-semibold leading-[31px]"
                          >
                            -
                          </button>
                          <span className="font-inter text-[26px] font-semibold leading-[31px]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="font-inter text-[26px] font-semibold leading-[31px]"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-inter text-[18px] font-semibold text-darkGreen leading-[22px] w-[160px]">
                          Only <span className="text-green">{randomNum} </span>
                          items left! Don’t miss it
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <button className="flex items-center gap-[12px] px-[142px] py-[16px] bg-green rounded-[10px] font-inter text-[22px] font-bold leading-[27px] text-white">
                          <LuShoppingCart className="w-[24px] h-[24px]" /> Add
                          to cart
                        </button>
                        <img
                          src={LikeSvg}
                          alt="icon"
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="mt-[50px] border-4 border-dashed rounded-[15px]">
                        <div className="pt-[23px] pb-[20px] pr-[59px] border-b-4 border-dashed pl-[36px] flex items-center">
                          <img src={item1Svg} alt="svg" />
                          <div className="flex flex-col gap-[7px] ml-[28px]">
                            <p className="font-readexPro text-[18px] leading-[23px] font-semibold">
                              Free delivery
                            </p>
                            <p className="font-inter text-[16px] font-medium leading-[19px] underline">
                              Enter your Postal Code for Delivery Availability
                            </p>
                          </div>
                        </div>
                        <div className="pt-[25px] pb-[20px] pr-[115px] pl-[36px] flex items-center">
                          <img src={item2Svg} alt="svg" />
                          <div className="flex flex-col gap-[7px] ml-[28px]">
                            <p className="font-readexPro text-[18px] leading-[23px] font-semibold">
                              Return Delivery
                            </p>
                            <p className="font-inter text-[16px] font-medium leading-[19px] underline">
                              Free delivery 30 Days return
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border-t-4 border-b-4 px-[42px] border-dashed mt-[70px]">
                  <div className="collapse collapse-arrow">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title text-[24px] leading-[30px] font-medium">
                      Specification and details
                    </div>
                    <div className="collapse-content">
                      <h3 className="font-hammersmithOne text-[48px] leading-[60px] mb-[16px]">
                        {product.name}
                      </h3>
                      <p className="font-readexPro text-[18px] leading-[23px] font-medium mb-[19px]">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </section>

          <section className="mt-[70px] mb-[100px]">
            <div className="container px-[90px]">
              <h3 className="font-hammersmithOne text-[48px] leading-[60px] mb-[78px]">
                Reviews
              </h3>
              <div className="flex gap-[62px]">
                <div className="max-w-[160px]">
                  <h4 className="font-hammersmithOne text-[64px] leading-[80px] mb-[10px] px-[34px]">
                    {product.ratings_stars}
                  </h4>
                  <p className="flex ">
                    {"⭐".repeat(Math.round(product.ratings_stars))} (
                    {product.rating_counts})
                  </p>
                  <span className="font-inter text-[16px] leading-[19px] mt-[20px] block">
                    30 Ratings
                  </span>
                </div>
                <ul className="flex flex-col gap-[15px]">
                  <li className="max-w-[560px] flex items-center justify-between">
                    <div className="flex">
                      <span className="inline-block mr-[14px] font-inter text-[18px] font-bold leading-[22px]">
                        5 stars
                      </span>
                      <img src={star5} alt="svg" />
                    </div>
                    <span className="inline-block ml-[35px] ">4</span>
                  </li>
                  <li className="max-w-[560px] flex items-center justify-between">
                    <div className="flex">
                      <span className="inline-block mr-[14px] font-inter text-[18px] font-bold leading-[22px]">
                        4 stars
                      </span>
                      <img src={star4} alt="svg" />
                    </div>
                    <span className="inline-block ml-[35px] ">7</span>
                  </li>
                  <li className="max-w-[560px] flex items-center justify-between">
                    <div className="flex">
                      <span className="inline-block mr-[14px] font-inter text-[18px] font-bold leading-[22px]">
                        3 stars
                      </span>
                      <img src={star3} alt="svg" />
                    </div>
                    <span className="inline-block ml-[35px] ">15</span>
                  </li>
                  <li className="max-w-[560px] flex items-center justify-between">
                    <div className="flex">
                      <span className="inline-block mr-[14px] font-inter text-[18px] font-bold leading-[22px]">
                        2 stars
                      </span>
                      <img src={star2} alt="svg" />
                    </div>
                    <span className="inline-block ml-[35px] ">6</span>
                  </li>
                  <li className="max-w-[560px] flex items-center justify-between">
                    <div className="flex">
                      <span className="inline-block mr-[14px] font-inter text-[18px] font-bold leading-[22px]">
                        1 stars
                      </span>
                      <img src={star1} alt="svg" />
                    </div>
                    <span className="inline-block ml-[35px] ">2</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default SingleProduct;
