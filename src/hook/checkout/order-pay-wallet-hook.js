import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { createOrderWallet } from "../../redux/actions/walletAction";
import { getOneUserAddress } from "../../redux/actions/userAddressesAction";
import notify from "../useNotifaction";
import GetAllUserCartHook from "./../cart/get-all-user-cart-hook";

const OrderPayWalletHook = () => {
  const [loading, setLoading] = useState(true);
  const [loadingCreate, setLoadingCreate] = useState(true);
  const [addressDetalis, setAddressDetalis] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, , , , , cartID] = GetAllUserCartHook();

  //when change address by user
  const handelChooseAddress = (e) => {
    setAddressDetalis([]);
    if (e.target.value != "0") get(e.target.value);
  };

  const get = async (id) => {
    setLoading(true);
    await dispatch(getOneUserAddress(id));
    setLoading(false);
  };

  //get address detalis for user
  const resAddress = useSelector(
    (state) => state.userAddressesReducer.oneAddress
  );
  useEffect(() => {
    if (loading === false) {
      if (resAddress && resAddress.status === "success") {
        setAddressDetalis(resAddress.data);
      } else setAddressDetalis([]);
    }
  }, [loading]);

  //when user click
  const handelCreateOrderWallet = async () => {
    if (cartID === "0") {
      notify("من فضلك اضف منتجات الى العربه اولا", "warn");
      return;
    }
    if (addressDetalis.length <= 0) {
      notify("من فضلك اختر عنوان اولا", "warn");
      return;
    }
    setLoadingCreate(true);
    await dispatch(
      createOrderWallet(cartID, {
        shippingAddress: {
          details: addressDetalis.alias,
          phone: addressDetalis.phone,
          city: "",
          postalCode: "",
        },
      })
    );
    setLoadingCreate(false);
  };

  //get response for create order wallet
  const resOrderWallet = useSelector(
    (state) => state.walletReducer.createOrderWallet
  );
  useEffect(() => {
    if (loadingCreate === false) {
      if (resOrderWallet && resOrderWallet.status === 201) {
        notify("تم إنشاء الطلب ودفع المبلغ من المحفظة بنجاح", "success");
        setTimeout(() => {
          navigate("/user/allorders");
        }, 1500);
      } else {
        notify("فشل في إكمال الطلب من فضلك حاول مرة أخرى", "warn");
      }
    }
  }, [loadingCreate]);

  return [handelChooseAddress, addressDetalis, handelCreateOrderWallet];
};

export default OrderPayWalletHook;
