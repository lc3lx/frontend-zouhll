import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateColor, getOneColor } from "../../redux/actions/colorAction";
import { getAllCategory as getAllCategoriesAction } from "../../redux/actions/categoryAction";
import notify from "../../hook/useNotifaction";

const EditColorHook = (id) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [hex, setHex] = useState("#000000");
  const [categoryIds, setCategoryIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Get categories for selection
  useEffect(() => {
    dispatch(getAllCategoriesAction(100));
  }, [dispatch]);

  const categories = useSelector((state) => state.allCategory.category);
  const color = useSelector((state) => state.allColors.oneColor);
  const res = useSelector((state) => state.allColors.colors);

  // Load color data on component mount
  useEffect(() => {
    const loadColorData = async () => {
      setLoadingData(true);
      await dispatch(getOneColor(id));
      setLoadingData(false);
    };
    if (id) {
      loadColorData();
    }
  }, [id, dispatch]);

  // Set form data when color is loaded
  useEffect(() => {
    if (color.data && !loadingData) {
      setName(color.data.name || "");
      setHex(color.data.hex || "#000000");
      // Handle categoryIds - could be array of objects or IDs
      const catIds =
        color.data.categoryIds?.map((cat) =>
          typeof cat === "object" ? cat._id : cat
        ) || [];
      setCategoryIds(catIds);
    }
  }, [color, loadingData]);

  // Handle name change
  const onChangeName = (event) => {
    event.persist();
    setName(event.target.value);
  };

  // Handle hex change
  const onChangeHex = (event) => {
    setHex(event.target.value);
  };

  // Handle category selection
  const onCategoryChange = (selectedCategories) => {
    const ids = selectedCategories.map((cat) => cat._id || cat);
    setCategoryIds(ids);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name === "") {
      notify("من فضلك أدخل اسم اللون", "warn");
      return;
    }
    if (!hex || !hex.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      notify("من فضلك أدخل كود لون صحيح (مثل #FF0000)", "warn");
      return;
    }

    const formData = {
      name,
      hex,
      categoryIds: categoryIds.length > 0 ? categoryIds : [],
    };

    setLoading(true);
    setIsPress(true);
    await dispatch(updateColor(id, formData));
    setLoading(false);
  };

  // Handle response
  useEffect(() => {
    if (loading === false && isPress) {
      setLoading(true);
      setTimeout(() => setIsPress(false), 1000);

      if (res && res.status === 200) {
        notify("تم تحديث اللون بنجاح", "success");
      } else if (res) {
        notify("هناك مشكلة في عملية التحديث", "error");
      }
    }
  }, [loading, isPress, res]);

  return [
    name,
    hex,
    categoryIds,
    loading,
    isPress,
    handleSubmit,
    onChangeName,
    onChangeHex,
    onCategoryChange,
    categories,
    color,
  ];
};

export default EditColorHook;
