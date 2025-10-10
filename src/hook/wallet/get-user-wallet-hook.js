import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallet } from "../../redux/actions/walletAction";
import notify from "../useNotifaction";

const GetUserWalletHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getUserWallet());
      setLoading(false);
    };
    get();
  }, []);

  const userWallet = useSelector((state) => state.walletReducer.userWallet);

  return [userWallet, loading];
};

export default GetUserWalletHook;
