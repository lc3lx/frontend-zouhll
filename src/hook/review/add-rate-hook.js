import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewUser,
  forgetPassword,
  loginUser,
} from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import notify from "../useNotifaction";
import { createReview } from "./../../redux/actions/reviewAction";

const AddRateHook = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rateText, setRateText] = useState("");
  const [rateValue, setRateValue] = useState(0);

  const [loading, setLoading] = useState(false);

  const OnChangeRateText = (e) => {
    setRateText(e.target.value);
  };
  const OnChangeRateValue = (val) => {
    setRateValue(val);
  };
  var user = "";
  if (localStorage.getItem("user") != null)
    user = JSON.parse(localStorage.getItem("user"));

  ///when save rate
  const onSubmit = async () => {
    if (rateText === "") {
      notify("من فضلك اكتب تعليق", "error");
      return;
    }
    if (rateValue === 0) {
      notify("من فضلك اختر تقييم", "error");
      return;
    }
    if (!user) {
      notify("يجب تسجيل الدخول أولاً", "error");
      return;
    }

    setLoading(true);
    await dispatch(
      createReview(id, {
        title: rateText,
        ratings: rateValue,
      })
    );
    setLoading(false);
  };

  const res = useSelector((state) => state.reviewReducer.createView);

  useEffect(() => {
    if (loading === false && res) {
      console.log("Review response:", res);

      if (res.status === 403) {
        notify("غير مسموح للادمن بالتقييم", "error");
      } else if (res.status === 400 && res.data?.errors) {
        const errorMsg = res.data.errors[0]?.msg || "خطأ في البيانات";
        if (errorMsg.includes("already created a review")) {
          notify("لقد قمت باضافة تقييم لهذا المنتج مسبقا", "error");
        } else {
          notify(errorMsg, "error");
        }
      } else if (res.status === 201 && res.data) {
        notify("تمت اضافة التقييم بنجاح", "success");
        setRateText("");
        setRateValue(0);
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else if (res.status >= 400) {
        notify("حدث خطأ أثناء إضافة التقييم", "error");
      }
    }
  }, [loading, res]);

  return [
    OnChangeRateText,
    OnChangeRateValue,
    rateText,
    rateValue,
    user,
    onSubmit,
  ];
};

export default AddRateHook;
