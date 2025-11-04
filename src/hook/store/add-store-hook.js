import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStore } from "../../redux/actions/storeAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifaction";
import avatar from "../../images/avatar.png";

const AddStoreHook = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(avatar);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  //to change name state
  const onChangeName = (event) => {
    event.persist();
    setName(event.target.value);
  };

  //when image change save it
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };
  const res = useSelector((state) => state.allStore.store);

  //save data in database
  const handelSubmit = async (event) => {
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
    await dispatch(createStore(formData));
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false && isPress) {
      setImg(avatar);
      setName("");
      setSelectedFile(null);
      setTimeout(() => setIsPress(false), 1000);

      if (res && res.status === 201) {
        notify("تمت عملية الإضافة بنجاح", "success");
      } else if (res) {
        notify("هناك مشكلة في عملية الإضافة", "error");
      }
    }
  }, [loading, isPress, res]);

  return [
    img,
    name,
    loading,
    isPress,
    handelSubmit,
    onImageChange,
    onChangeName,
  ];
};

export default AddStoreHook;
