import React, { useState, useEffect } from "react";
import { getOneCategory } from "../../redux/actions/subcategoryAction";
import { createProduct } from "../../redux/actions/productsAction";
import notify from "./../../hook/useNotifaction";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "./../../redux/actions/brandAction";

const AdminAddProductsHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllBrand());
  }, []);
  //get last catgeory state from redux
  const category = useSelector((state) => state.allCategory.category);
  //get last brand state from redux
  const brand = useSelector((state) => state.allBrand.brand);

  //get last sub cat state from redux
  const subCat = useSelector((state) => state.subCategory.subcategory);

  const onSelect = (selectedList) => {
    setSeletedSubID(selectedList);
  };
  const onRemove = (selectedList) => {
    setSeletedSubID(selectedList);
  };

  const [options, setOptions] = useState([]);

  //values images products
  const [images, setImages] = useState({});
  //values state
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState("السعر قبل الخصم");
  const [priceAftr, setPriceAftr] = useState("السعر بعد الخصم");
  const [qty, setQty] = useState("الكمية المتاحة");
  const [productUrl, setProductUrl] = useState("");
  const [CatID, setCatID] = useState("");
  const [BrandID, SetBrandID] = useState("");
  const [subCatID, setSubCatID] = useState([]);
  const [seletedSubID, setSeletedSubID] = useState([]);
  const [loading, setLoading] = useState(true);

  // Variant builder state
  const [variants, setVariants] = useState([]);
  // helpers to manage variants
  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        colorName: "",
        colorHex: "#000000",
        price: "",
        sku: "",
        images: {}, // MultiImageInput-like structure
        sizes: [], // [{label, stock}]
      },
    ]);
  };
  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };
  const setVariantField = (index, field, value) => {
    setVariants((prev) => prev.map((v, i) => (i === index ? { ...v, [field]: value } : v)));
  };
  const setVariantImages = (index, imagesObj) => {
    setVariantField(index, "images", imagesObj);
  };
  const addVariantSize = (index, label, stock) => {
    if (!label) return;
    const s = { label, stock: Number(stock || 0) };
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, sizes: [...(v.sizes || []), s] } : v))
    );
  };
  const removeVariantSize = (vIndex, sIndex) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === vIndex ? { ...v, sizes: (v.sizes || []).filter((_, j) => j !== sIndex) } : v
      )
    );
  };

  //to change name state
  const onChangeProdName = (event) => {
    event.persist();
    setProdName(event.target.value);
  };
  //to change name state
  const onChangeDesName = (event) => {
    event.persist();
    setProdDescription(event.target.value);
  };
  //to change name state
  const onChangePriceBefor = (event) => {
    event.persist();
    setPriceBefore(event.target.value);
  };
  //to change name state
  const onChangePriceAfter = (event) => {
    event.persist();
    setPriceAftr(event.target.value);
  }; //to change name state
  const onChangeQty = (event) => {
    event.persist();
    setQty(event.target.value);
  };
  const onChangeProductUrl = (event) => {
    event.persist();
    setProductUrl(event.target.value);
  };
  const onChangeColor = (event) => {
    event.persist();
    setShowColor(!showColor);
  };

  //to show hide color picker
  const [showColor, setShowColor] = useState(false);
  //to store all pick color
  const [colors, setColors] = useState([]);
  //when choose new color
  const handelChangeComplete = (color) => {
    setColors([...colors, color.hex]);
    setShowColor(!showColor);
  };
  const removeColor = (color) => {
    const newColor = colors.filter((e) => e !== color);
    setColors(newColor);
  };

  //when selet category store id
  const onSeletCategory = async (e) => {
    const val = e.target.value;
    setCatID(val);
    if (val && val !== "0") {
      await dispatch(getOneCategory(val));
    } else {
      setOptions([]);
    }
    // reset selected subcategories when category changes
    setSeletedSubID([]);
  };
  useEffect(() => {
    if (CatID && CatID !== "0") {
      if (subCat.data) setOptions(subCat.data);
    } else {
      setOptions([]);
    }
  }, [CatID, subCat]);

  //when selet brand store id
  const onSeletBrand = (e) => {
    SetBrandID(e.target.value);
  };

  //to convert base 64 to file
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  //to save data
  const handelSubmit = async (e) => {
    e.preventDefault();
    const imgList = Object.values(images || {});
    if (
      !CatID || CatID === "0" ||
      prodName === "" ||
      prodDescription === "" ||
      imgList.length <= 0 ||
      priceBefore <= 0
    ) {
      notify("من فضلك اكمل البيانات", "warn");
      return;
    }

    //convert base 64 image to file
    const imgCover = dataURLtoFile(imgList[0], Math.random() + ".png");
    //convert array of base 64 image to file
    const itemImages = imgList.map((src) => dataURLtoFile(src, Math.random() + ".png"));

    const formData = new FormData();
    formData.append("title", prodName);
    formData.append("description", prodDescription);
    formData.append("quantity", qty);
    formData.append("price", priceBefore);
    if (priceAftr && Number(priceAftr) > 0) {
      formData.append("priceAfterDiscount", Number(priceAftr));
    }
    formData.append("category", CatID);
    if (BrandID && BrandID !== "0") {
      formData.append("brand", BrandID);
    }
    if (productUrl) formData.append("productUrl", productUrl);

    // append images synchronously
    formData.append("imageCover", imgCover);
    itemImages.forEach((item) => formData.append("images", item));
    if (Array.isArray(colors) && colors.length) {
      formData.append("colors", JSON.stringify(colors));
    }
    const subIds = Array.isArray(seletedSubID) ? seletedSubID.map((s) => s._id) : [];
    if (subIds.length) {
      formData.append("subcategories", JSON.stringify(subIds));
    }

    // Build variants payload if any
    try {
      if (Array.isArray(variants) && variants.length > 0) {
        const variantImageMap = [];
        let variantImageCount = 0; // backend limit: 30
        const variantPayload = variants.map((v) => {
          // convert MultiImageInput object to File list
          const keys = Object.keys(v.images || {});
          const files = keys.map((_, idx) => dataURLtoFile(v.images[idx], Math.random() + ".png"));
          let pushed = 0;
          files.forEach((f) => {
            if (variantImageCount < 30) {
              formData.append("variantImages", f);
              variantImageCount++;
              pushed++;
            }
          });
          variantImageMap.push(pushed);
          const cleanSizes = (v.sizes || []).map((s) => ({ label: s.label, stock: Number(s.stock || 0) }));
          const payload = {
            color: { name: v.colorName || "", hex: v.colorHex || "#000000" },
            sizes: cleanSizes,
          };
          if (v.sku) payload.sku = v.sku;
          if (v.price) payload.price = Number(v.price);
          return payload;
        });
        formData.append("variants", JSON.stringify(variantPayload));
        formData.append("variantImageMap", JSON.stringify(variantImageMap));
      }
    } catch (err) {
      console.warn("Variant build error", err);
    }

    setLoading(true);
    await dispatch(createProduct(formData));
    setLoading(false);
  };

  //get create meesage
  const product = useSelector((state) => state.allproducts.products);

  useEffect(() => {
    if (loading === false) {
      // setCatID(0)
      setColors([]);
      setImages([]);
      setProdName("");
      setProdDescription("");
      setPriceBefore("السعر قبل الخصم");
      setPriceAftr("السعر بعد الخصم");
      setQty("الكمية المتاحة");
      setProductUrl("");
      SetBrandID(0);
      setSeletedSubID([]);
      setTimeout(() => setLoading(true), 1500);

      if (product) {
        if (product.status === 201) {
          notify("تم الاضافة بنجاح", "success");
        } else {
          notify("هناك مشكله", "error");
        }
      }
    }
  }, [loading]);

  return [
    onChangeDesName,
    onChangeQty,
    onChangeColor,
    onChangePriceAfter,
    onChangePriceBefor,
    onChangeProdName,
    onChangeProductUrl,
    showColor,
    category,
    brand,
    priceAftr,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    handelChangeComplete,
    removeColor,
    onSeletCategory,
    handelSubmit,
    onSeletBrand,
    colors,
    priceBefore,
    qty,
    prodDescription,
    prodName,
    productUrl,
    // variants exports
    variants,
    addVariant,
    removeVariant,
    setVariantField,
    setVariantImages,
    addVariantSize,
    removeVariantSize,
  ];
};

export default AdminAddProductsHook;
