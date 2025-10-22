import React, { useState, useEffect } from "react";
import { getOneCategory } from "../../redux/actions/subcategoryAction";
import {
  createProduct,
  getOneProduct,
} from "../../redux/actions/productsAction";
import notify from "./../../hook/useNotifaction";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "./../../redux/actions/brandAction";
import { updateProducts } from "./../../redux/actions/productsAction";
import baseUrl from "./../../Api/baseURL";

const AdminEditProductsHook = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const run = async () => {
      await dispatch(getOneProduct(id));
      await dispatch(getAllCategory());
      await dispatch(getAllBrand());
    };
    run();
  }, []);

  //get one product details
  const item = useSelector((state) => state.allproducts.oneProduct);
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
  const [images, setImages] = useState([]);
  //values state
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState("");
  const [priceAftr, setPriceAftr] = useState("");
  const [qty, setQty] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [CatID, setCatID] = useState("0");
  const [BrandID, SetBrandID] = useState("0");
  const [subCatID, setSubCatID] = useState([]);
  const [seletedSubID, setSeletedSubID] = useState([]);
  const [loading, setLoading] = useState(true);

  // Variant builder state (for edit)
  const [variants, setVariants] = useState([]);
  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        colorName: "",
        colorHex: "#000000",
        price: "",
        sku: "",
        images: {},
        sizes: [],
      },
    ]);
  };
  const removeVariant = (index) =>
    setVariants((prev) => prev.filter((_, i) => i !== index));
  const setVariantField = (index, field, value) =>
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  const setVariantImages = (index, imagesObj) =>
    setVariantField(index, "images", imagesObj);
  const addVariantSize = (index, label, stock) => {
    if (!label) return;
    const s = { label, stock: Number(stock || 0) };
    setVariants((prev) =>
      prev.map((v, i) =>
        i === index ? { ...v, sizes: [...(v.sizes || []), s] } : v
      )
    );
  };
  const removeVariantSize = (vIndex, sIndex) =>
    setVariants((prev) =>
      prev.map((v, i) =>
        i === vIndex
          ? { ...v, sizes: (v.sizes || []).filter((_, j) => j !== sIndex) }
          : v
      )
    );

  useEffect(() => {
    if (item && item.data) {
      console.log("Product data:", item.data);

      // تأكد من أن الصور هي array
      setImages(Array.isArray(item.data.images) ? item.data.images : []);
      setProdName(item.data.title || "");
      setProdDescription(item.data.description || "");
      setPriceBefore(item.data.price || "");
      setPriceAftr(item.data.priceAfterDiscount || "");
      setQty(item.data.quantity || "");
      setProductUrl(item.data.productUrl || "");

      // إصلاح تحديد التصنيف
      if (item.data.category) {
        const categoryId =
          typeof item.data.category === "object"
            ? item.data.category._id
            : item.data.category;
        setCatID(categoryId || "0");
        console.log("Category ID set to:", categoryId);
      }

      // إصلاح تحديد الماركة
      if (item.data.brand) {
        const brandId =
          typeof item.data.brand === "object"
            ? item.data.brand._id
            : item.data.brand;
        SetBrandID(brandId || "0");
        console.log("Brand ID set to:", brandId);
      }

      // معالجة الألوان - التحقق من مصادر مختلفة
      let productColors = [];
      if (Array.isArray(item.data.availableColors)) {
        productColors = item.data.availableColors;
      } else if (Array.isArray(item.data.colors)) {
        productColors = item.data.colors;
      } else if (item.data.variants && Array.isArray(item.data.variants)) {
        productColors = item.data.variants
          .map((v) => v.color?.hex || v.color)
          .filter(Boolean);
      }
      setColors(productColors);
      console.log("Colors set to:", productColors);

      // معالجة التصنيفات الفرعية
      if (item.data.subcategory && Array.isArray(item.data.subcategory)) {
        setSeletedSubID(item.data.subcategory);
        console.log("Subcategories set to:", item.data.subcategory);
      }

      if (Array.isArray(item.data.variants)) {
        // initialize variants without pre-filling images (admin can re-upload per color)
        const init = item.data.variants.map((v) => ({
          colorName: v?.color?.name || "",
          colorHex: v?.color?.hex || "#000000",
          price: v?.price || "",
          sku: v?.sku || "",
          images: {},
          sizes: Array.isArray(v?.sizes)
            ? v.sizes.map((s) => ({ label: s.label, stock: s.stock }))
            : [],
        }));
        setVariants(init);
        console.log("Variants set to:", init);
      }
    }
  }, [item]);

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
    setCatID(e.target.value);
  };
  useEffect(() => {
    if (CatID != 0) {
      const run = async () => {
        await dispatch(getOneCategory(CatID));
      };
      run();
    }
  }, [CatID]);

  useEffect(() => {
    if (subCat) {
      setOptions(subCat.data);
    }
  }, [subCat]);

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

  //convert url to file
  const convertURLtoFile = async (url) => {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.blob();
    const ext = url.split(".").pop();
    const filename = url.split("/").pop();
    const metadata = { type: `image/${ext}` };
    return new File([data], Math.random(), metadata);
  };

  //to save data
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (
      CatID === 0 ||
      prodName === "" ||
      prodDescription === "" ||
      images.length <= 0 ||
      priceBefore <= 0
    ) {
      notify("من فضلك اكمل البيانات", "warn");
      return;
    }
    console.log(images[0]);
    let imgCover;
    if (images[0].length <= 1000) {
      convertURLtoFile(images[0]).then((val) => (imgCover = val));
    } else {
      imgCover = dataURLtoFile(images[0], Math.random() + ".png");
    }

    let itemImages = [];
    //convert array of base 64 image to file
    Array.from(Array(Object.keys(images).length).keys()).map((item, index) => {
      if (images[index].length <= 1000) {
        convertURLtoFile(images[index]).then((val) => itemImages.push(val));
      } else {
        itemImages.push(dataURLtoFile(images[index], Math.random() + ".png"));
      }
    });

    const formData = new FormData();
    formData.append("title", prodName);
    formData.append("description", prodDescription);
    formData.append("quantity", qty);
    formData.append("price", priceBefore);
    if (priceAftr && Number(priceAftr) > 0)
      formData.append("priceAfterDiscount", priceAftr);
    if (productUrl) formData.append("productUrl", productUrl);
    formData.append("category", CatID);
    if (BrandID && BrandID !== "0") {
      formData.append("brand", BrandID);
    }

    setTimeout(() => {
      formData.append("imageCover", imgCover);
      itemImages.map((item) => formData.append("images", item));
    }, 1000);

    setTimeout(() => {
      console.log(imgCover);
      console.log(itemImages);
    }, 1000);

    colors.map((color) => formData.append("colors", color));
    seletedSubID.map((item) => formData.append("subcategories", item._id));

    // Build variants payload if any
    try {
      if (Array.isArray(variants) && variants.length > 0) {
        const variantImageMap = [];
        const variantPayload = variants.map((v) => {
          const keys = Object.keys(v.images || {});
          const files = keys.map((_, idx) =>
            dataURLtoFile(v.images[idx], Math.random() + ".png")
          );
          files.forEach((f) => formData.append("variantImages", f));
          variantImageMap.push(files.length);
          const cleanSizes = (v.sizes || []).map((s) => ({
            label: s.label,
            stock: Number(s.stock || 0),
          }));
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

    setTimeout(async () => {
      setLoading(true);
      await dispatch(updateProducts(id, formData));
      setLoading(false);
    }, 1000);
  };

  //get create meesage
  const product = useSelector((state) => state.allproducts.updateProducts);

  useEffect(() => {
    if (loading === false && product) {
      //setCatID(0)
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

      if (product.status === 200) {
        notify("تم التعديل بنجاح", "success");
      } else {
        notify("هناك مشكله", "error");
      }
    }
  }, [loading, product]);

  return [
    CatID,
    BrandID,
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
    // variants export
    variants,
    addVariant,
    removeVariant,
    setVariantField,
    setVariantImages,
    addVariantSize,
    removeVariantSize,
  ];
};

export default AdminEditProductsHook;
