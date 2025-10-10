import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBrand } from "../../redux/actions/brandAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifaction";
import { getAllUserCartItems } from "../../redux/actions/cartAction";

const GetAllUserCartHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [itemsNum, setItemsNum] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [couponNameRes, setCouponName] = useState("");
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartID, setCartID] = useState("0");
  const [totalCartPriceAfterDiscount, setTotalCartPriceAfterDiscount] =
    useState(0);

  useEffect(() => {
    let isMounted = true;

    const get = async () => {
      setLoading(true);
      await dispatch(getAllUserCartItems());
      if (isMounted) {
        setLoading(false);
      }
    };
    get();

    return () => {
      isMounted = false;
    };
  }, []);
  const res = useSelector((state) => state.cartReducer.getAllUserCart);
  useEffect(() => {
    if (loading === false && res) {
      if (res.status === "success" && res.data) {
        setItemsNum(res.numOfCartItems || 0);
        setCartItems(Array.isArray(res.data.products) ? res.data.products : []);
        setTotalCartPrice(res.data.totalCartPrice || 0);
        setCartID(res.data._id || "0");
        if (res.data.coupon) {
          setCouponName(res.data.coupon);
        } else {
          setCouponName("");
        }
        if (res.data.totalAfterDiscount) {
          setTotalCartPriceAfterDiscount(res.data.totalAfterDiscount);
        } else {
          setTotalCartPriceAfterDiscount("");
        }
      } else {
        setCartID("0");
        setCouponName("");
        setTotalCartPriceAfterDiscount("");
        setItemsNum(0);
        setCartItems([]);
        setTotalCartPrice(0);
      }
    }
  }, [loading, res]);

  return [
    itemsNum,
    cartItems,
    totalCartPrice,
    couponNameRes,
    totalCartPriceAfterDiscount,
    cartID,
  ];
};

export default GetAllUserCartHook;
