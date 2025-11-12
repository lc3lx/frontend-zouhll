import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSize } from "../../redux/actions/sizeAction";
import { getAllCategory as getAllCategories } from "../../redux/actions/categoryAction";
import notify from "../../hook/useNotifaction";

const AddSizeHook = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState("Clothing");
  const [categoryIds, setCategoryIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  // Get categories for selection
  useEffect(() => {
    dispatch(getAllCategories(100));
  }, [dispatch]);

  const categories = useSelector((state) => state.allCategory.category);
  const res = useSelector((state) => state.allSizes.sizes);

  // Handle name change
  const onChangeName = (event) => {
    event.persist();
    setName(event.target.value);
  };

  // Handle type change
  const onChangeType = (event) => {
    setType(event.target.value);
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
      notify("من فضلك أدخل اسم المقاس", "warn");
      return;
    }

    const formData = {
      name,
      type,
      categoryIds: categoryIds.length > 0 ? categoryIds : [],
    };

    setLoading(true);
    setIsPress(true);
    await dispatch(createSize(formData));
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false && isPress) {
      setName("");
      setType("Clothing");
      setCategoryIds([]);
      setTimeout(() => setIsPress(false), 1000);

      if (res && res.status === 201) {
        notify("تمت إضافة المقاس بنجاح", "success");
      } else if (res) {
        notify("هناك مشكلة في عملية الإضافة", "error");
      }
    }
  }, [loading, isPress, res]);

  return [
    name,
    type,
    categoryIds,
    loading,
    isPress,
    handelSubmit,
    onChangeName,
    onChangeType,
    onCategoryChange,
    categories,
  ];
};

export default AddSizeHook;
