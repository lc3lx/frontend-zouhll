import { useEffect, useState } from "react";
import { createExchangeRate } from "../../redux/actions/exchangeRateAction";
import { useSelector, useDispatch } from "react-redux";
import notify from "../../hook/useNotifaction";

const useAddExchangeRateHook = () => {
  const dispatch = useDispatch();

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("SYP");
  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(true);

  // Get exchange rate from redux
  const exchangeRate = useSelector(
    (state) => state.exchangeRateReducer.exchangeRate
  );

  // On change from currency
  const onChangeFromCurrency = (e) => {
    setFromCurrency(e.target.value);
  };

  // On change to currency
  const onChangeToCurrency = (e) => {
    setToCurrency(e.target.value);
  };

  // To save rate
  const onChangeRate = (e) => {
    setRate(e.target.value);
  };

  // On save data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!navigator.onLine) {
      notify("هناك مشكله فى الاتصال بالانترنت", "warn");
      return;
    }
    if (fromCurrency === "") {
      notify("من فضلك اختر العملة المصدر", "warn");
      return;
    }
    if (toCurrency === "") {
      notify("من فضلك اختر العملة الهدف", "warn");
      return;
    }
    if (fromCurrency === toCurrency) {
      notify("لا يمكن أن تكون العملة المصدر والهدف متشابهتين", "warn");
      return;
    }
    if (rate === "" || isNaN(rate) || parseFloat(rate) <= 0) {
      notify("من فضلك ادخل سعر صرف صحيح", "warn");
      return;
    }

    const data = {
      fromCurrency,
      toCurrency,
      rate: parseFloat(rate),
    };

    setLoading(true);
    await dispatch(createExchangeRate(data));
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false && exchangeRate) {
      setFromCurrency("USD");
      setToCurrency("SYP");
      setRate("");
      if (exchangeRate.status === 201) {
        notify("تم إضافة سعر الصرف بنجاح", "success");
      } else {
        notify("هناك مشكله فى عملية الإضافة", "error");
      }
    }
  }, [loading, exchangeRate]);

  return [
    fromCurrency,
    toCurrency,
    rate,
    loading,
    onChangeFromCurrency,
    onChangeToCurrency,
    onChangeRate,
    handleSubmit,
  ];
};

export default useAddExchangeRateHook;
