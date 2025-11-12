import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createColor } from "../../redux/actions/colorAction";
import { getAllCategory as getAllCategories } from "../../redux/actions/categoryAction";
import notify from "../../hook/useNotifaction";

const AddColorHook = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [hex, setHex] = useState("#000000");
  const [categoryIds, setCategoryIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  // Get categories for selection
  useEffect(() => {
    dispatch(getAllCategories(100));
  }, [dispatch]);

  const categories = useSelector((state) => state.allCategory.category);
  const res = useSelector((state) => state.allColors.colors);

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
  const handelSubmit = async (event) => {
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
    await dispatch(createColor(formData));
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false && isPress) {
      setName("");
      setHex("#000000");
      setCategoryIds([]);
      setTimeout(() => setIsPress(false), 1000);

      if (res && res.status === 201) {
        notify("تمت إضافة اللون بنجاح", "success");
      } else if (res) {
        notify("هناك مشكلة في عملية الإضافة", "error");
      }
    }
  }, [loading, isPress, res]);

  return [
    name,
    hex,
    categoryIds,
    loading,
    isPress,
    handelSubmit,
    onChangeName,
    onChangeHex,
    onCategoryChange,
    categories,
  ];
};

export default AddColorHook;
