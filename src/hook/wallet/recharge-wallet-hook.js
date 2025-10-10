import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rechargeWallet } from "../../redux/actions/walletAction";
import notify from "../useNotifaction";

const RechargeWalletHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const recharge = async (code) => {
    if (code === "") {
      notify("من فضلك أدخل كود الشحن", "warn");
      return;
    }
    setLoading(true);
    await dispatch(rechargeWallet(code));
    setLoading(false);
  };

  const rechargeWalletRes = useSelector(
    (state) => state.walletReducer.rechargeWallet
  );

  useEffect(() => {
    if (loading === false) {
      if (rechargeWalletRes && rechargeWalletRes.status === "success") {
        notify("تم شحن المحفظة بنجاح", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        notify("فشل في شحن المحفظة. تحقق من الكود", "error");
      }
    }
  }, [loading]);

  return [recharge, rechargeWalletRes];
};

export default RechargeWalletHook;
