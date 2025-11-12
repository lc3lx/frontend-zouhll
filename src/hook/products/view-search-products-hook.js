import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getAllProductsSearch,
} from "../../redux/actions/productsAction";

const ViewSearchProductsHook = () => {
  let limit = 8;
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  // تعريف المتغيرات في النطاق الصحيح
  let pricefromString = "",
    priceToString = "";
  let word = "",
    queryCat = "",
    brandCat = "",
    priceTo = "",
    priceFrom = "";
  let sortType = "",
    sort = "";

  const getProduct = async () => {
    try {
      setLoading(true);
      getStorge();
      sortData();

      // إذا لم توجد معاملات بحث، اجلب جميع المنتجات
      if (
        !word &&
        !queryCat &&
        !brandCat &&
        !pricefromString &&
        !priceToString
      ) {
        await dispatch(getAllProducts(`sort=${sort}&limit=${limit}`));
      } else {
        await dispatch(
          getAllProductsSearch(
            `sort=${sort}&limit=${limit}&keyword=${word}&${queryCat}&${brandCat}${pricefromString}${priceToString}`
          )
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const allProducts = useSelector((state) => state.allproducts.allProducts);

  let items = [];
  let pagination = [];
  let results = 0;
  try {
    if (allProducts.data) items = allProducts.data;
    else items = [];
  } catch (e) {}
  try {
    if (allProducts.paginationResult)
      pagination = allProducts.paginationResult.numberOfPages;
    else pagination = [];
  } catch (e) {}
  try {
    if (allProducts.results) results = allProducts.results;
    else results = 0;
  } catch (e) {}

  //when click pagination
  const onPress = async (page) => {
    getStorge();
    sortData();

    // إذا لم توجد معاملات بحث، اجلب جميع المنتجات
    if (!word && !queryCat && !brandCat && !pricefromString && !priceToString) {
      await dispatch(
        getAllProducts(`sort=${sort}&limit=${limit}&page=${page}`)
      );
    } else {
      await dispatch(
        getAllProductsSearch(
          `sort=${sort}&limit=${limit}&page=${page}&keyword=${word}&${queryCat}&${brandCat}${pricefromString}${priceToString}`
        )
      );
    }
  };

  const getStorge = () => {
    if (localStorage.getItem("searchWord") != null)
      word = localStorage.getItem("searchWord");
    if (localStorage.getItem("catCecked") != null)
      queryCat = localStorage.getItem("catCecked");
    if (localStorage.getItem("brandCecked") != null)
      brandCat = localStorage.getItem("brandCecked");
    if (localStorage.getItem("priceTo") != null)
      priceTo = localStorage.getItem("priceTo");
    if (localStorage.getItem("priceFrom") != null)
      priceFrom = localStorage.getItem("priceFrom");

    // Convert to numbers for comparison
    const priceFromNum = parseFloat(priceFrom) || 0;
    const priceToNum = parseFloat(priceTo) || 0;

    // Only add price filters if they are valid and priceFrom < priceTo
    if (priceFromNum > 0 && priceToNum > 0 && priceFromNum < priceToNum) {
      pricefromString = `&price[gte]=${priceFromNum}`;
      priceToString = `&price[lte]=${priceToNum}`;
    } else if (priceFromNum > 0 && priceToNum <= 0) {
      pricefromString = `&price[gte]=${priceFromNum}`;
      priceToString = "";
    } else if (priceToNum > 0 && priceFromNum <= 0) {
      pricefromString = "";
      priceToString = `&price[lte]=${priceToNum}`;
    } else {
      pricefromString = "";
      priceToString = "";
    }
  };

  ///when user choose sort type
  const sortData = () => {
    if (localStorage.getItem("sortType") !== null) {
      sortType = localStorage.getItem("sortType");
    } else {
      sortType = "";
    }

    if (sortType === "السعر من الاقل للاعلي") sort = "+price";
    else if (sortType === "السعر من الاعلي للاقل") sort = "-price";
    else if (sortType === "") sort = "";
    else if (sortType === "الاكثر مبيعا") sort = "-sold";
    else if (sortType === "الاعلي تقييما") sort = "-quantity";
  };

  return [items, pagination, onPress, getProduct, results, loading];
};

export default ViewSearchProductsHook;
