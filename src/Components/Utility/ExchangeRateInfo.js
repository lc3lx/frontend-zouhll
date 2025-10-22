import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentExchangeRate } from "../../redux/actions/exchangeRateAction";

const ExchangeRateInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentExchangeRate("USD", "SYP"));
  }, [dispatch]);

  const currentExchangeRate = useSelector(
    (state) => state.exchangeRateReducer.currentExchangeRate
  );

  if (!currentExchangeRate?.data?.exchangeRate) {
    return null;
  }

  const rate = currentExchangeRate.data.exchangeRate.rate;
  const lastUpdated = new Date(
    currentExchangeRate.data.exchangeRate.lastUpdated
  ).toLocaleDateString("ar-SY");

  return (
    <div
      className="exchange-rate-info"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "8px 16px",
        borderRadius: "4px",
        fontSize: "14px",
        color: "#6c757d",
        textAlign: "center",
        margin: "10px 0",
      }}
    >
      <span>💱 سعر الصرف الحالي: 1 USD = {rate?.toLocaleString()} SYP</span>
      <span style={{ marginLeft: "15px", fontSize: "12px" }}>
        آخر تحديث: {lastUpdated}
      </span>
    </div>
  );
};

export default ExchangeRateInfo;
