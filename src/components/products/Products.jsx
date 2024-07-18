import React, { useEffect, useState } from "react";
import api from "../../api/products.js";
import axios from "axios";

// components
import Feed from "./Feed.jsx";

// icons & imgs
import { MdKeyboardArrowDown } from "react-icons/md";

// store
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../store/productsSlice.js";

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [addingToCart, setAddingToCart] = useState(false);

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  const [sortedPrice, setSortedPrice] = useState("");

  const [showPagination, setShowPagination] = useState(true);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = 9;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseBrands = await api.get("/brands");
        setBrands(responseBrands.data);

        const responseColors = await api.get("/colors");
        setColors(responseColors.data);

        const productsCountResponse = await api.get("/products");
        const productsCount = productsCountResponse.data.length;
        const pagesCount = Math.ceil(productsCount / pageCount);
        const pages = new Array(pagesCount).fill().map((_, i) => i + 1);
        setTotalPages(pages);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProducts = async () => {
      const params = [];

      let Query = `/products`;
      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }
      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }
      if (sortedPrice) {
        params.push(
          `_sort=price&_order=${encodeURIComponent(
            sortedPrice
          )}&_limit=${pageCount}&_page=${currentPage}`
        );
      }
      if (params.length > 0) {
        Query += `?${params.join("&")}`;
        setShowPagination(false);
      } else {
        Query += `?_limit=${pageCount}&_page=${currentPage}`;
        setShowPagination(true);
      }

      setError(null);
      setIsLoading(true);
      try {
        const response = await api.get(Query, {
          signal,
        });

        dispatch(setProducts(response.data));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled", error.message);
        } else {
          console.error(error.message);
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(fetchProducts, 1000);

    return () => {
      console.log("clean up");
      controller.abort();
    };
  }, [selectedBrand, selectedColor, sortedPrice, currentPage]);

  const clearFilters = () => {
    setSelectedBrand("");
    setSelectedColor("");
    setSortedPrice("");
    // bu qushimchani filterlarni tozalagach paginationni 1-page utkazib yuborishi uchun yozdim
    setCurrentPage(1);
  };
  return (
    <div className="main__content">
      <div className="bg-slimGreen py-[20px] mb-[65px]">
        <div className="flex justify-between items-center container">
          <p className="font-hammersmithOne text-[24px] leading-[30px] capitalize text-green">
            Filter by:
          </p>
          <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <p
              tabIndex={0}
              className="flex items-center gap-[6px] font-hammersmithOne text-[24px] leading-[30px] cursor-pointer capitalize text-green"
            >
              <MdKeyboardArrowDown />
              Sort by
            </p>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-36 p-2 shadow"
            >
              <li>
                <a>Price</a>
              </li>
              <li>
                <a>Rating</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mb-[100px] grid grid-cols-[270px_1fr] gap-[55px]">
        <aside>
          <div className="border-t-2 border-b-2 border-dashed border-#454444CC pt-[14px] pb-[8px]">
            <div className="collapse collapse-arrow">
              <input type="checkbox" />
              <div className="collapse-title text-[20px] leading-[25px] text-darkGreen font-bold px-0">
                BRAND
              </div>
              <div className="collapse-content px-0">
                <ul className="flex flex-col gap-[21px] mt-[4px]">
                  {brands.map((brand, index) => (
                    <li key={index} className="flex gap-[18px]">
                      <input
                        className="checkbox checkbox-success"
                        // defaultChecked={brand === selectedBrand}
                        type="radio"
                        value={brand}
                        name="brand"
                        id={brand}
                        checked={brand === selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                      />
                      <label
                        className="cursor-pointer font-readexPro text-[18px] font-light leading-[23px]"
                        htmlFor={brand}
                      >
                        {brand}
                      </label>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedBrand("")}
                  className="w-full py-[12px] bg-lightGreen rounded-[10px] font-inter font-bold text-[22px] leading-[27px] text-white hover:bg-slimGreen hover:text-darkGreen transition mt-[30px]"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-b-2 border-dashed border-#454444CC pt-[14px] pb-[8px]">
            <div className="collapse collapse-arrow">
              <input type="checkbox" />
              <div className="collapse-title text-[20px] leading-[25px] text-darkGreen font-bold px-0">
                COLORS
              </div>
              <div className="collapse-content px-0 w-[175px]">
                <ul className="grid grid-cols-6 gap-[11px]">
                  {colors.map((color, index) => (
                    <li key={index}>
                      <div
                        style={{
                          background: color,
                          outline:
                            selectedColor === color ? "3px solid red" : "",
                        }}
                        className="w-5 h-5 rounded-full border-[1px] border-black"
                        onClick={() => setSelectedColor(color)}
                      />
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedColor("")}
                  className="w-full py-[12px] bg-lightGreen rounded-[10px] font-inter font-bold text-[22px] leading-[27px] text-white hover:bg-slimGreen hover:text-darkGreen transition mt-[30px]"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-b-2 border-dashed border-#454444CC pt-[14px] pb-[8px]">
            <div className="collapse collapse-arrow">
              <input type="checkbox" />
              <div className="collapse-title text-[20px] leading-[25px] text-darkGreen font-bold px-0">
                SORT BY PRICE
              </div>
              <div className="collapse-content px-0 w-full">
                <ul className="">
                  <li className="flex items-center gap-[16px] mb-[20px]">
                    <input
                      className="checkbox checkbox-success"
                      type="radio"
                      value="asc"
                      name="price"
                      id="upgradePrice"
                      checked={sortedPrice === "asc"}
                      onChange={(e) => setSortedPrice(e.target.value)}
                    />
                    <label
                      className="font-bold text-[19px] leading-[24px] mb-[6px]"
                      htmlFor="upgradePrice"
                    >
                      Low to high
                    </label>
                  </li>
                  <li className="flex items-center gap-[16px]">
                    <input
                      className="checkbox checkbox-success"
                      type="radio"
                      value="desc"
                      name="price"
                      id="downgradePrice"
                      checked={sortedPrice === "desc"}
                      onChange={(e) => setSortedPrice(e.target.value)}
                    />
                    <label
                      className="font-bold text-[19px] leading-[24px]"
                      htmlFor="downgradePrice"
                    >
                      High to low
                    </label>
                  </li>
                </ul>
                <button
                  onClick={() => {
                    setSortedPrice("");
                  }}
                  className="w-full py-[12px] bg-lightGreen rounded-[10px] font-inter font-bold text-[22px] leading-[27px] text-white hover:bg-slimGreen hover:text-darkGreen transition mt-[30px]"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
          <button
            className="w-full py-[12px] bg-lightGreen rounded-[10px] font-inter font-bold text-[22px] leading-[27px] text-white hover:bg-slimGreen hover:text-darkGreen transition mt-[80px]"
            onClick={() => clearFilters()}
          >
            Clear All Filters
          </button>
        </aside>
        <main>
          <Feed
            products={products}
            onLoad={isLoading}
            error={error}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            showPagination={showPagination}
          />
        </main>
      </div>
    </div>
  );
};

export default Products;
