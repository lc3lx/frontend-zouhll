import { useHomeProducts } from "./useProducts";

const ViewHomeProductsHook = () => {
  const { data, loading, error } = useHomeProducts(8);

  let items = [];
  try {
    // الـ API يرجع structure: { results, paginationResult, data: [...] }
    // لذا data.data تحتوي على array المنتجات
    if (data && data.data && Array.isArray(data.data)) {
      items = data.data.slice(0, 4);
    } else if (data && Array.isArray(data)) {
      items = data.slice(0, 4);
    } else {
      items = [];
    }
  } catch (e) {
    console.log("خطأ في تحليل بيانات المنتجات:", e);
    items = [];
  }

  return [items, loading, error];
};

export default ViewHomeProductsHook;
