import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { deleteProductFromCart } from "../../store/productsSlice";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const CartList = ({ product }) => {
  const [quantity, setQuantity] = React.useState(1);

  const dispatch = useDispatch();

  const deleteCartList = (id) => {
    console.log(id);
    try {
      dispatch(deleteProductFromCart(id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <li
      key={product.id}
      className="px-[20px] py-[35px] flex gap-[20px] border-t-4 border-dashed items-start"
    >
      <button
        onClick={() => {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              deleteCartList(product.id);
            }
          });
        }}
      >
        <IoCloseSharp />
      </button>
      <div className="flex gap-[36px]">
        <img
          src={product.image_url}
          className="w-[155px] h-[155px] border-2 rounded-md"
          alt="img"
        />
        <div className="flex flex-col w-[240px]">
          <p className="font-hammersmithOne text-[20px] leading-[25px] text-darkGreen mb-[7px]">
            {product.brand_name}
          </p>
          <span className="font-readexPro text-[18px] font-light leading-[23px] mb-[16px]">
            {product.name}
          </span>
          <span className="font-readexPro text-[16px] font-light leading-[20px] mb-[7px]">
            Black
          </span>
          <span className="font-readexPro text-[16px] font-light leading-[20px] mb-[7px] text-lightGreen">
            In stock
          </span>
        </div>
        <div className="gap-[30px] flex items-center h-[55px] justify-between py-[14px] px-[32px] bg-base-200 rounded-[40px]">
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
        <p className="font-readexPro text-[24px] font-bold leading-[30px]">
          ${product.price}
        </p>
      </div>
    </li>
  );
};

export default CartList;
