import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductWishList } from "./../../redux/actions/wishListAction";

const CardContainerHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [favProd, setFavProd] = useState([]);
  const res = useSelector((state) => state.addToWishListReducer.allWishList);

  useEffect(() => {
    let isMounted = true;

    const get = async () => {
      setLoading(true);
      await dispatch(getProductWishList());
      if (isMounted) {
        setLoading(false);
      }
    };

    get();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (loading === false && res && res.data) {
      if (Array.isArray(res.data) && res.data.length >= 1) {
        setFavProd(res.data.map((item) => item._id));
      } else {
        setFavProd([]);
      }
    }
  }, [loading, res]);

  return [favProd];
};

export default CardContainerHook;
