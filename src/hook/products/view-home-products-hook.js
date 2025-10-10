import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeProducts } from "../../redux/actions/productsAction";

const ViewHomeProductsHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeProducts(8)); // تمرير limit للحصول على 8 منتجات
  }, [dispatch]);

  const homeProducts = useSelector((state) => state.allproducts.homeProducts);
  const loading = useSelector((state) => state.allproducts.homeLoading);

  console.log("ViewHomeProductsHook Debug:", {
    homeProducts,
    loading,
    homeProductsType: typeof homeProducts,
    hasData: homeProducts?.data,
    dataLength: homeProducts?.data?.length,
  });

  let items = [];
  try {
    // الـ API يرجع structure: { results, paginationResult, data: [...] }
    // لذا homeProducts.data تحتوي على array المنتجات
    if (homeProducts && homeProducts.data && Array.isArray(homeProducts.data)) {
      items = homeProducts.data.slice(0, 4);
      console.log(
        "ViewHomeProductsHook - items from homeProducts.data:",
        items
      );
    } else if (homeProducts && Array.isArray(homeProducts)) {
      items = homeProducts.slice(0, 4);
      console.log("ViewHomeProductsHook - items from homeProducts:", items);
    } else {
      items = [];
      console.log("ViewHomeProductsHook - no items found");
    }
  } catch (e) {
    console.log("خطأ في تحليل بيانات المنتجات:", e);
    items = [];
  }

  console.log("ViewHomeProductsHook - final return:", { items, loading });
  return [items, loading];
};

export default ViewHomeProductsHook;
