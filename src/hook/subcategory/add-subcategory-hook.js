import { useEffect, useState } from "react";
import { createSubCategory } from "../../redux/actions/subcategoryAction";
import { useSelector, useDispatch } from "react-redux";
import notify from "../../hook/useNotifaction";
import { getAllCategory } from "../../redux/actions/categoryAction";

const useAddSubcategoryHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!navigator.onLine) {
      notify("هناك مشكله فى الاتصال بالانترنت", "warn");
      return;
    }
    dispatch(getAllCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [id, setID] = useState("0");
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(true);
  //get last catgeory state from redux
  const category = useSelector((state) => state.allCategory.category);

  //get last sub catgeory state from redux
  const subcategory = useSelector((state) => state.subCategory.subcategory);

  //on change dropdown menu
  const handelChange = (e) => {
    console.log(e.target.value);
    setID(e.target.value);
  };

  //to save name
  const onChangeName = (e) => {
    e.persist();
    setName(e.target.value);
  };

  //to save image
  const onChangeImg = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };
  //on save data
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!navigator.onLine) {
      notify("هناك مشكله فى الاتصال بالانترنت", "warn");
      return;
    }
    if (id === "0") {
      notify("من فضلك اختر تصنيف رئيسي", "warn");
      return;
    }
    if (name === "") {
      notify("من فضلك ادخل اسم التصنيف", "warn");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", id);
    if (img) {
      formData.append("image", img);
    }

    setLoading(true);
    await dispatch(createSubCategory(formData));
    setLoading(false);
  };
  useEffect(() => {
    if (loading === false && subcategory) {
      setName("");
      setID("0");
      setImg(null);
      console.log(subcategory);
      if (subcategory.status === 201) {
        notify("تمت الاضافة بنجاح", "success");
      } else if (
        subcategory === "Error Error: Request failed with status code 400"
      ) {
        notify("هذا الاسم مكرر من فضلك اختر اسم اخر", "warn");
      } else {
        notify("هناك مشكله فى عملية الاضافة", "warn");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, subcategory]);

  return [
    id,
    name,
    img,
    loading,
    category,
    subcategory,
    handelChange,
    handelSubmit,
    onChangeName,
    onChangeImg,
  ];
};

export default useAddSubcategoryHook;
