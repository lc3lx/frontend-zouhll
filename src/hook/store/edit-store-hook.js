import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStore, getOneStore } from "../../redux/actions/storeAction";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifaction";
import avatar from "../../images/avatar.png";

const EditStoreHook = (id) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(avatar);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const store = useSelector((state) => state.allStore.oneStore);
  const res = useSelector((state) => state.allStore.store);

  // Load store data on component mount
  useEffect(() => {
    const loadStoreData = async () => {
      setLoadingData(true);
      await dispatch(getOneStore(id));
      setLoadingData(false);
    };
    if (id) {
      loadStoreData();
    }
  }, [id, dispatch]);

  // Set form data when store is loaded
  useEffect(() => {
    if (store.data && !loadingData) {
      setName(store.data.name || "");
      setImg(store.data.logo || avatar);
    }
  }, [store, loadingData]);

  // Handle name change
  const onChangeName = (event) => {
    event.persist();
    setName(event.target.value);
  };

  // Handle image change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name === "") {
      notify("من فضلك أدخل اسم المتجر", "warn");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (selectedFile) {
      formData.append("logo", selectedFile);
    }

    setLoading(true);
    setIsPress(true);
    await dispatch(updateStore(id, formData));
    setLoading(false);
  };

  // Handle response
  useEffect(() => {
    if (loading === false && isPress) {
      setLoading(true);
      setTimeout(() => setIsPress(false), 1000);

      if (res.status === 200) {
        notify("تم تحديث المتجر بنجاح", "success");
      } else {
        notify("هناك مشكلة في عملية التحديث", "error");
      }
    }
  }, [loading, isPress, res]);

  return [
    img,
    name,
    loading,
    isPress,
    handleSubmit,
    onImageChange,
    onChangeName,
    store,
  ];
};

export default EditStoreHook;
