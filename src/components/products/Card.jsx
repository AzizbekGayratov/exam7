import React from "react";
import { Link } from "react-router-dom";

// store
import { useDispatch } from "react-redux";
import { addToCart as addToCartAction } from "../../store/productsSlice.js";

// icons
import { LuShoppingCart } from "react-icons/lu";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Card = ({ product, setSearch, setShowSearch }) => {
  const [addingToCart, setAddingToCart] = React.useState(false);

  const dispatch = useDispatch();

  const addToCart = (product) => {
    try {
      setAddingToCart(true);
      dispatch(addToCartAction(product));

      setSearch("");
      setShowSearch(false);
      toast.success("Product added to cart");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <li className="w-[300px]" key={product.id}>
      <img
        src={product.image_url}
        alt={product.title}
        className="w-[300px] h-[300px] border-[0.5px] rounded-t-lg"
      />
      <div className="my-[22px] w-[280px]">
        <h3 className="font-hammersmithOne text-[20px] leading-[25px] mb-[12px] hover:underline">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="font-readexPro text-[18px] leading-[23px] font-light">
          {product.description.length <= 50
            ? product.description
            : product.description.slice(0, 50) + "..."}
        </p>
      </div>
      <div className="flex gap-[12px] mb-[26px]">
        {product.color_options.map((color, i) => (
          <div
            key={i}
            style={{ backgroundColor: color }}
            className="w-[30px] h-[30px] rounded-full  border-[0.5px] border-black cursor-pointer"
          ></div>
        ))}
      </div>
      <p className="font-readexPro text-[22px] leading-[28px] font-semibold mb-[22px]">
        ${product.price}
      </p>
      <button
        onClick={() => {
          Swal.fire({
            icon: "question",
            title: "Are you sure?",
            text: "You want to add this product to your cart?",
            showCancelButton: true,
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.isConfirmed) {
              addToCart(product);
            }
          });
        }}
        className="flex items-center gap-[10px] px-[34px] text-white bg-green py-[16px] rounded-[10px] font-inter font-bold text-[22px] leading-[27px]"
      >
        <LuShoppingCart className="text-[26px]" />{" "}
        {addingToCart ? "Adding..." : "Add to Cart"}
      </button>
    </li>
  );
};

export default Card;
