import { useEffect, useState } from "react";
import {
  getCurrentExchangeRate,
  convertPrice,
} from "../../redux/actions/exchangeRateAction";
import { useSelector, useDispatch } from "react-redux";

const useGetCurrentExchangeRateHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getCurrentExchangeRate("USD", "SYP"));
      setLoading(false);
    };
    get();
  }, [dispatch]);

  // Get current exchange rate from redux
  const currentExchangeRate = useSelector(
    (state) => state.exchangeRateReducer.currentExchangeRate
  );

  // Convert price function
  const convertPriceToSYP = async (amount) => {
    if (amount && !isNaN(amount)) {
      await dispatch(convertPrice(amount, "USD", "SYP"));
    }
  };

  // Get converted price from redux
  const convertedPrice = useSelector(
    (state) => state.exchangeRateReducer.convertedPrice
  );

  return [currentExchangeRate, convertedPrice, loading, convertPriceToSYP];
};

export default useGetCurrentExchangeRateHook;
