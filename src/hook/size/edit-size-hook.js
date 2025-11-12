import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSize, getOneSize } from "../../redux/actions/sizeAction";
import { getAllCategory as getAllCategoriesAction } from "../../redux/actions/categoryAction";
import notify from "../../hook/useNotifaction";

const EditSizeHook = (id) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState("Clothing");
  const [categoryIds, setCategoryIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Get categories for selection
  useEffect(() => {
    dispatch(getAllCategoriesAction(100));
  }, [dispatch]);

  const categories = useSelector((state) => state.allCategory.category);
  const size = useSelector((state) => state.allSizes.oneSize);
  const res = useSelector((state) => state.allSizes.sizes);

  // Load size data on component mount
  useEffect(() => {
    const loadSizeData = async () => {
      setLoadingData(true);
      await dispatch(getOneSize(id));
      setLoadingData(false);
    };
    if (id) {
      loadSizeData();
    }
  }, [id, dispatch]);

  // Set form data when size is loaded
  useEffect(() => {
    if (size.data && !loadingData) {
      setName(size.data.name || "");
      setType(size.data.type || "Clothing");
      // Handle categoryIds - could be array of objects or IDs
      const catIds =
        size.data.categoryIds?.map((cat) =>
          typeof cat === "object" ? cat._id : cat
        ) || [];
      setCategoryIds(catIds);
    }
  }, [size, loadingData]);

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
  const handleSubmit = async (event) => {
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
    await dispatch(updateSize(id, formData));
    setLoading(false);
  };

  // Handle response
  useEffect(() => {
    if (loading === false && isPress) {
      setLoading(true);
      setTimeout(() => setIsPress(false), 1000);

      if (res && res.status === 200) {
        notify("تم تحديث المقاس بنجاح", "success");
      } else if (res) {
        notify("هناك مشكلة في عملية التحديث", "error");
      }
    }
  }, [loading, isPress, res]);

  return [
    name,
    type,
    categoryIds,
    loading,
    isPress,
    handleSubmit,
    onChangeName,
    onChangeType,
    onCategoryChange,
    categories,
    size,
  ];
};

export default EditSizeHook;
