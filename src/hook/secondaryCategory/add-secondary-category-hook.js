import { useEffect, useState } from "react";
import { createSecondaryCategory } from "../../redux/actions/secondaryCategoryAction";
import { getAllSubcategories } from "../../redux/actions/subcategoryAction";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { useSelector, useDispatch } from "react-redux";
import notify from "../../hook/useNotifaction";

const useAddSecondaryCategoryHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!navigator.onLine) {
      notify("هناك مشكله فى الاتصال بالانترنت", "warn");
      return;
    }
    dispatch(getAllCategory());
    dispatch(getAllSubcategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [categoryId, setCategoryId] = useState("0");
  const [subCategoryId, setSubCategoryId] = useState("0");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  // Get categories and subcategories from redux
  const categories = useSelector((state) => state.allCategory.category);
  const subcategories = useSelector((state) => state.subCategory.subcategories);
  const secondaryCategory = useSelector(
    (state) => state.secondaryCategory.secondaryCategories
  );

  // On change category dropdown
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setSubCategoryId("0"); // Reset subcategory when category changes
  };

  // On change subcategory dropdown
  const handleSubCategoryChange = (e) => {
    setSubCategoryId(e.target.value);
  };

  // To save name
  const onChangeName = (e) => {
    e.persist();
    setName(e.target.value);
  };

  // Get filtered subcategories based on selected category
  const getFilteredSubcategories = () => {
    if (!subcategories?.data || categoryId === "0") return [];
    return subcategories.data.filter(
      (sub) => sub.category === categoryId || sub.category._id === categoryId
    );
  };

  // On save data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!navigator.onLine) {
      notify("هناك مشكله فى الاتصال بالانترنت", "warn");
      return;
    }
    if (categoryId === "0") {
      notify("من فضلك اختر تصنيف رئيسي", "warn");
      return;
    }
    if (subCategoryId === "0") {
      notify("من فضلك اختر تصنيف فرعي", "warn");
      return;
    }
    if (name === "") {
      notify("من فضلك ادخل اسم التصنيف الثانوي", "warn");
      return;
    }

    const data = {
      name,
      category: categoryId,
      subCategory: subCategoryId,
    };

    setLoading(true);
    await dispatch(createSecondaryCategory(data));
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false && secondaryCategory) {
      setName("");
      setCategoryId("0");
      setSubCategoryId("0");
      if (secondaryCategory.status === 201) {
        notify("تم الإضافة بنجاح", "success");
      } else {
        notify("هناك مشكله فى عملية الإضافة", "error");
      }
    }
  }, [loading, secondaryCategory]);

  return [
    categoryId,
    subCategoryId,
    name,
    loading,
    handleCategoryChange,
    handleSubCategoryChange,
    onChangeName,
    handleSubmit,
    categories,
    getFilteredSubcategories,
  ];
};

export default useAddSecondaryCategoryHook;
