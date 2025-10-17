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
      
      // التحقق من وجود token
      const token = localStorage.getItem("token");
      console.log('User token:', token ? 'Found' : 'Not found');
      
      if (token) {
        await dispatch(getAllUserCartItems());
      } else {
        console.log('No token found, skipping cart fetch');
        setLoading(false);
        return;
      }
      
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
  
  // Debug: طباعة البيانات من Redux
  console.log('Redux Cart Response:', res);
  console.log('Loading state:', loading);

  useEffect(() => {
    if (loading === false && res) {
      console.log('Processing cart data:', res);
      
      if (res.status === "success" && res.data) {
        console.log('Cart data found:', res.data);
        console.log('Cart items from API:', res.data.cartItems);
        console.log('Products from API:', res.data.products);
        
        setItemsNum(res.numOfCartItems || 0);
        
        // البحث عن المنتجات في cartItems أو products
        let items = [];
        if (Array.isArray(res.data.cartItems)) {
          items = res.data.cartItems;
        } else if (Array.isArray(res.data.products)) {
          items = res.data.products;
        }
        
        console.log('Final cart items to set:', items);
        setCartItems(items);
        setTotalCartPrice(res.data.totalCartPrice || 0);
        setCartID(res.data._id || "0");
        if (res.data.coupon) {
          setCouponName(res.data.coupon);
        } else {
          setCouponName("");
        }
        if (res.data.totalPriceAfterDiscount) {
          setTotalCartPriceAfterDiscount(Number(res.data.totalPriceAfterDiscount));
        } else {
          setTotalCartPriceAfterDiscount(0);
        }
      } else {
        console.log('No cart data or error:', res);
        setCartID("0");
        setCouponName("");
        setTotalCartPriceAfterDiscount(0);
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
