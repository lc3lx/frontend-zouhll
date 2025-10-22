import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentExchangeRate,
  convertPrice,
} from "../../redux/actions/exchangeRateAction";

const PriceDisplay = ({
  price,
  currency = "USD",
  showBothCurrencies = true,
  className = "",
  style = {},
}) => {
  const dispatch = useDispatch();
  const [displayCurrency, setDisplayCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const currentExchangeRate = useSelector(
    (state) => state.exchangeRateReducer.currentExchangeRate
  );
  const convertedPrice = useSelector(
    (state) => state.exchangeRateReducer.convertedPrice
  );

  useEffect(() => {
    // Get current exchange rate on component mount
    dispatch(getCurrentExchangeRate("USD", "SYP"));
  }, [dispatch]);

  useEffect(() => {
    // Convert price when currency changes or price changes
    if (displayCurrency === "SYP" && currency === "USD" && price) {
      dispatch(convertPrice(price, "USD", "SYP"));
    }
  }, [dispatch, displayCurrency, currency, price]);

  useEffect(() => {
    // Update converted amount when conversion result is available
    if (convertedPrice?.data?.convertedAmount) {
      setConvertedAmount(convertedPrice.data.convertedAmount);
    }
  }, [convertedPrice]);

  const toggleCurrency = () => {
    setDisplayCurrency(displayCurrency === "USD" ? "SYP" : "USD");
  };

  const formatPrice = (amount, curr) => {
    if (!amount) return "0";

    const formatted = Number(amount).toLocaleString();

    switch (curr) {
      case "USD":
        return `$${formatted}`;
      case "SYP":
        return `${formatted} ل.س`;
      default:
        return `${formatted} ${curr}`;
    }
  };

  const getCurrentPrice = () => {
    if (currency === "USD" && displayCurrency === "SYP") {
      return convertedAmount || price;
    }
    return price;
  };

  const getCurrentCurrency = () => {
    if (currency === "USD" && displayCurrency === "SYP") {
      return "SYP";
    }
    return currency;
  };

  return (
    <div className={`price-display ${className}`} style={style}>
      <div className="d-flex align-items-center gap-2">
        <span className="price-amount">
          {formatPrice(getCurrentPrice(), getCurrentCurrency())}
        </span>

        {showBothCurrencies && currentExchangeRate?.data && (
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={toggleCurrency}
            style={{ fontSize: "12px", padding: "2px 8px" }}
          >
            {displayCurrency === "USD" ? "عرض بالليرة" : "عرض بالدولار"}
          </button>
        )}
      </div>

      {showBothCurrencies &&
        displayCurrency === "SYP" &&
        currentExchangeRate?.data && (
          <small className="text-muted d-block mt-1">
            سعر الصرف: 1 USD ={" "}
            {currentExchangeRate.data.exchangeRate?.rate?.toLocaleString()} SYP
          </small>
        )}
    </div>
  );
};

export default PriceDisplay;
