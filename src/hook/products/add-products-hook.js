import { useState, useEffect } from "react";
import { getOneCategory } from "../../redux/actions/subcategoryAction";
import { createProduct } from "../../redux/actions/productsAction";
import notify from "./../../hook/useNotifaction";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "./../../redux/actions/brandAction";
import { getAllStore } from "./../../redux/actions/storeAction";
import { getSizesByCategory } from "../../redux/actions/sizeAction";
import { getColorsByCategory } from "../../redux/actions/colorAction";
import { useGetData as getData } from "../../hooks/useGetData";

const AdminAddProductsHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllBrand());
    dispatch(getAllStore());
  }, [dispatch]);
  //get last catgeory state from redux
  const category = useSelector((state) => state.allCategory.category);
  //get last brand state from redux
  const brand = useSelector((state) => state.allBrand.brand);
  //get last store state from redux
  const store = useSelector((state) => state.allStore.store);

  //get last sub cat state from redux
  const subCat = useSelector((state) => state.subCategory.subcategory);
  const [secondaryCatID, setSecondaryCatID] = useState([]);
  const [secondaryOptions, setSecondaryOptions] = useState([]);

  // Ensure secondaryCatID and secondaryOptions are always arrays
  useEffect(() => {
    if (!Array.isArray(secondaryCatID)) {
      setSecondaryCatID([]);
    }
    if (!Array.isArray(secondaryOptions)) {
      setSecondaryOptions([]);
    }
  }, [secondaryCatID, secondaryOptions]);

  const onSelect = (selectedList) => {
    setSeletedSubID(selectedList);
  };
  const onRemove = (selectedList) => {
    setSeletedSubID(selectedList);
  };
  // معالجات اختيار/إزالة التصنيف الثانوي
  const onSelectSecondary = (selectedList) => setSecondaryCatID(selectedList);
  const onRemoveSecondary = (selectedList) => setSecondaryCatID(selectedList);

  const [options, setOptions] = useState([]);

  // Ensure options is always an array
  useEffect(() => {
    if (!Array.isArray(options)) {
      setOptions([]);
    }
  }, [options]);

  //values images products
  const [images, setImages] = useState({});
  // Cover image state - separate from variant images
  const [imageCover, setImageCover] = useState(null);
  //values state
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState("السعر قبل الخصم");
  const [priceAftr, setPriceAftr] = useState("السعر بعد الخصم");
  const [qty, setQty] = useState("الكمية المتاحة");
  const [productUrl, setProductUrl] = useState("");
  const [CatID, setCatID] = useState("");
  const [BrandID, SetBrandID] = useState("");
  const [StoreID, SetStoreID] = useState("");
  // const [subCatID, setSubCatID] = useState([]);
  const [seletedSubID, setSeletedSubID] = useState([]);
  const [loading, setLoading] = useState(true);

  // New fields state
  const [season, setSeason] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [deliveryStartDate, setDeliveryStartDate] = useState("");
  const [deliveryEndDate, setDeliveryEndDate] = useState("");
  const [deliveryDays, setDeliveryDays] = useState(0);
  const [currency, setCurrency] = useState("USD");

  // Available sizes for selected category
  const [availableSizes, setAvailableSizes] = useState([]);
  const sizesByCategory = useSelector(
    (state) => state.allSizes.sizesByCategory
  );

  // Available colors for selected category
  const [availableColors, setAvailableColors] = useState([]);
  const colorsByCategory = useSelector(
    (state) => state.allColors.colorsByCategory
  );

  // Variant builder state
  const [variants, setVariants] = useState([]);
  // عندما تتغير التصنيفات الفرعية، اجلب التصنيفات الثانوية المقابلة
  useEffect(() => {
    const run = async () => {
      if (!seletedSubID || seletedSubID.length === 0) {
        setSecondaryOptions([]);
        setSecondaryCatID([]);
        return;
      }
      try {
        const ids = seletedSubID.map((s) => s._id);
        const results = await Promise.all(
          ids.map((id) =>
            getData(`/api/v1/subcategories/${id}/secondary-categories`)
          )
        );
        const merged = [];
        const seen = new Set();
        results.forEach((res) => {
          (res?.data || []).forEach((sc) => {
            if (!seen.has(sc._id)) {
              seen.add(sc._id);
              merged.push(sc);
            }
          });
        });
        setSecondaryOptions(merged);
      } catch (e) {
        setSecondaryOptions([]);
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(seletedSubID)]);

  // جلب المقاسات والألوان المتاحة عند تغيير التصنيف الرئيسي
  useEffect(() => {
    if (CatID && CatID !== "0") {
      dispatch(getSizesByCategory(CatID));
      dispatch(getColorsByCategory(CatID));
    } else {
      setAvailableSizes([]);
      setAvailableColors([]);
    }
  }, [CatID, dispatch]);

  // تحديث availableSizes عند جلب المقاسات
  useEffect(() => {
    if (sizesByCategory?.data) {
      setAvailableSizes(sizesByCategory.data);
    }
  }, [sizesByCategory]);

  // تحديث availableColors عند جلب الألوان
  useEffect(() => {
    if (colorsByCategory?.data) {
      setAvailableColors(colorsByCategory.data);
    }
  }, [colorsByCategory]);
  // إضافة variant من لون جاهز
  const addVariantFromColor = (colorId) => {
    const selectedColor = availableColors.find((c) => c._id === colorId);
    if (!selectedColor) return;

    setVariants((prev) => {
      // التحقق من عدم تكرار اللون
      const colorExists = prev.some((v) => v.colorId === colorId);
      if (colorExists) {
        notify("هذا اللون موجود بالفعل", "warn");
        return prev;
      }

      const firstVariant = prev.length > 0 ? prev[0] : null;
      const newVariant = {
        colorId: selectedColor._id,
        colorHex: selectedColor.hex,
        colorName: selectedColor.name,
        price: firstVariant?.price || "",
        sku: firstVariant?.sku || "",
        images: {},
        sizes: firstVariant?.sizes ? [...firstVariant.sizes] : [],
      };
      notify(`تم إضافة اللون ${selectedColor.name}`, "success");
      return [...prev, newVariant];
    });
  };

  // helpers to manage variants
  const addVariant = () => {
    setVariants((prev) => {
      // If there's a first variant, copy its sizes, price, and sku
      // إذا كان هناك أول لون، انسخ قياساته وسعره و SKU
      const firstVariant = prev.length > 0 ? prev[0] : null;
      const newVariant = {
        colorHex: "#000000",
        price: firstVariant?.price || "",
        sku: firstVariant?.sku || "",
        images: {}, // MultiImageInput-like structure
        sizes: firstVariant?.sizes ? [...firstVariant.sizes] : [], // Copy sizes array
      };
      return [...prev, newVariant];
    });
  };
  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };
  const setVariantField = (index, field, value) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  };
  const setVariantImages = (index, imagesObj) => {
    setVariantField(index, "images", imagesObj);
  };
  const addVariantSize = (index, label, stock) => {
    if (!label) return;
    const s = { label, stock: Number(stock || 0) };
    setVariants((prev) =>
      prev.map((v, i) =>
        i === index ? { ...v, sizes: [...(v.sizes || []), s] } : v
      )
    );
  };

  // إضافة مقاس من القائمة الجاهزة
  const addVariantSizeFromList = (vIndex, sizeId, stock) => {
    const selectedSize = availableSizes.find((s) => s._id === sizeId);
    if (!selectedSize) return;

    // التحقق من عدم تكرار المقاس
    const variant = variants[vIndex];
    const sizeExists = variant?.sizes?.some((s) => s.sizeId === sizeId);
    if (sizeExists) {
      notify("هذا المقاس موجود بالفعل", "warn");
      return;
    }

    const newSize = {
      sizeId: selectedSize._id,
      label: selectedSize.name,
      stock: Number(stock || 0),
    };

    setVariants((prev) =>
      prev.map((v, i) =>
        i === vIndex ? { ...v, sizes: [...(v.sizes || []), newSize] } : v
      )
    );
  };

  // إضافة جميع المقاسات المتاحة للون معين
  const addAllAvailableSizes = (vIndex) => {
    if (availableSizes.length === 0) {
      notify("لا توجد مقاسات متاحة لهذا التصنيف", "warn");
      return;
    }

    const variant = variants[vIndex];
    const existingSizeIds = (variant?.sizes || [])
      .map((s) => s.sizeId)
      .filter(Boolean);
    const sizesToAdd = availableSizes
      .filter((s) => !existingSizeIds.includes(s._id))
      .map((s) => ({
        sizeId: s._id,
        label: s.name,
        stock: 0,
      }));

    if (sizesToAdd.length === 0) {
      notify("جميع المقاسات موجودة بالفعل", "info");
      return;
    }

    setVariants((prev) =>
      prev.map((v, i) =>
        i === vIndex ? { ...v, sizes: [...(v.sizes || []), ...sizesToAdd] } : v
      )
    );
    notify(`تم إضافة ${sizesToAdd.length} مقاس`, "success");
  };
  const removeVariantSize = (vIndex, sIndex) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === vIndex
          ? { ...v, sizes: (v.sizes || []).filter((_, j) => j !== sIndex) }
          : v
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

  // New fields change handlers
  const onChangeSeason = (event) => {
    setSeason(event.target.value);
  };

  const onChangeFabricType = (event) => {
    event.persist();
    setFabricType(event.target.value);
  };

  const onChangeDeliveryStartDate = (event) => {
    setDeliveryStartDate(event.target.value);
  };

  const onChangeDeliveryEndDate = (event) => {
    setDeliveryEndDate(event.target.value);
  };

  const onChangeDeliveryDays = (event) => {
    const days = parseInt(event.target.value) || 0;
    setDeliveryDays(days);
    // Auto-calculate end date if start date exists
    if (deliveryStartDate && days > 0) {
      const start = new Date(deliveryStartDate);
      const end = new Date(start);
      end.setDate(end.getDate() + days);
      setDeliveryEndDate(end.toISOString().split("T")[0]);
    }
  };

  const onChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };

  // Calculate delivery days when dates change
  useEffect(() => {
    if (deliveryStartDate && deliveryEndDate) {
      const start = new Date(deliveryStartDate);
      const end = new Date(deliveryEndDate);
      if (end >= start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDeliveryDays(diffDays);
      } else {
        setDeliveryDays(0);
      }
    } else {
      setDeliveryDays(0);
    }
  }, [deliveryStartDate, deliveryEndDate]);

  //when selet category store id
  const onSeletCategory = async (e) => {
    const val = e.target.value;
    setCatID(val);
    if (val && val !== "0") {
      await dispatch(getOneCategory(val));
    } else {
      setOptions([]);
    }
    // reset selected subcategories and secondary categories when category changes
    setSeletedSubID([]);
    setSecondaryCatID([]);
    setSecondaryOptions([]);
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

  //when selet store store id
  const onSeletStore = (e) => {
    SetStoreID(e.target.value);
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

    // Validation with specific error messages
    if (!CatID || CatID === "0") {
      notify("من فضلك اختر التصنيف", "warn");
      return;
    }
    if (prodName === "") {
      notify("من فضلك أدخل اسم المنتج", "warn");
      return;
    }
    if (prodDescription === "") {
      notify("من فضلك أدخل وصف المنتج", "warn");
      return;
    }
    if (!priceBefore || priceBefore <= 0 || priceBefore === "السعر قبل الخصم") {
      notify("من فضلك أدخل السعر قبل الخصم", "warn");
      return;
    }

    // Validate variants - must have at least one variant with images
    if (!Array.isArray(variants) || variants.length === 0) {
      notify("يجب إضافة لون واحد على الأقل مع صوره", "warn");
      return;
    }

    // Validate each variant has images
    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];
      const variantImages = Object.values(v.images || {});
      if (variantImages.length === 0) {
        notify(
          `اللون ${i + 1} (${
            i === 0 ? "الافتراضي" : ""
          }): يجب إضافة صورة واحدة على الأقل لهذا اللون`,
          "warn"
        );
        return;
      }
      if (variantImages.length > 10) {
        notify(`اللون ${i + 1}: يمكنك إضافة حتى 10 صور لكل لون`, "warn");
        return;
      }
    }

    // Validate and use separate imageCover field
    // التحقق من صورة الغلاف المنفصلة
    if (!imageCover) {
      notify("يجب إضافة صورة الغلاف للمنتج", "warn");
      return;
    }

    // Convert imageCover to File if it's a base64 string
    let imgCover;
    if (typeof imageCover === "string") {
      imgCover = dataURLtoFile(imageCover, Math.random() + ".png");
    } else if (imageCover instanceof File) {
      imgCover = imageCover;
    } else {
      notify("صورة الغلاف غير صحيحة", "warn");
      return;
    }

    // No general images - all images are in variants

    const formData = new FormData();
    formData.append("title", prodName);
    formData.append("description", prodDescription);

    // Quantity is optional
    if (qty && qty !== "الكمية المتاحة" && qty !== "") {
      formData.append("quantity", qty);
    }

    formData.append("price", priceBefore);
    if (priceAftr && Number(priceAftr) > 0) {
      formData.append("priceAfterDiscount", Number(priceAftr));
    }
    formData.append("category", CatID);

    // Brand is optional
    if (BrandID && BrandID !== "0") {
      formData.append("brand", BrandID);
    }

    // Store is optional
    if (StoreID && StoreID !== "0") {
      formData.append("store", StoreID);
    }

    if (productUrl) formData.append("productUrl", productUrl);

    // New fields
    if (season) formData.append("season", season);
    if (fabricType) formData.append("fabricType", fabricType);

    // Delivery dates and days
    if (deliveryStartDate && deliveryEndDate) {
      formData.append("deliveryStartDate", deliveryStartDate);
      formData.append("deliveryEndDate", deliveryEndDate);
      if (deliveryDays > 0) {
        formData.append("deliveryDays", deliveryDays);
      }
    }

    formData.append("currency", currency);

    // append cover image (separate field)
    formData.append("imageCover", imgCover);

    // Colors - only extract from variants, not from separate colors array
    // Colors are now only in variants, each variant has its own color
    const subIds = Array.isArray(seletedSubID)
      ? seletedSubID.map((s) => s._id)
      : [];
    if (subIds.length) {
      formData.append("subcategories", JSON.stringify(subIds));
    }
    const secondaryIds = Array.isArray(secondaryCatID)
      ? secondaryCatID.map((s) => s._id)
      : [];
    if (secondaryIds.length) {
      formData.append("secondaryCategories", JSON.stringify(secondaryIds));
    }
    // Build variants payload if any
    try {
      if (Array.isArray(variants) && variants.length > 0) {
        const variantImageMap = [];
        let variantImageCount = 0; // backend limit: 30
        const variantPayload = variants.map((v) => {
          // convert MultiImageInput object to File list
          const keys = Object.keys(v.images || {});
          const files = keys.map((_, idx) =>
            dataURLtoFile(v.images[idx], Math.random() + ".png")
          );
          let pushed = 0;
          files.forEach((f) => {
            if (variantImageCount < 30) {
              formData.append("variantImages", f);
              variantImageCount++;
              pushed++;
            }
          });
          variantImageMap.push(pushed);
          const cleanSizes = (v.sizes || []).map((s) => ({
            label: s.label,
            stock: Number(s.stock || 0),
          }));
          const payload = {
            color: v.colorHex || "#000000",
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

    try {
      setLoading(true);
      await dispatch(createProduct(formData));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error creating product:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "حدث خطأ أثناء إضافة المنتج. يرجى المحاولة مرة أخرى";
      notify(errorMessage, "error");
    }
  };

  //get create meesage
  const product = useSelector((state) => state.allproducts.products);

  useEffect(() => {
    if (loading === false && product) {
      if (product.status === 201) {
        // Only clear form data on successful submission
        setImages({});
        setProdName("");
        setProdDescription("");
        setPriceBefore("السعر قبل الخصم");
        setPriceAftr("السعر بعد الخصم");
        setQty("الكمية المتاحة");
        setProductUrl("");
        SetBrandID(0);
        SetStoreID(0);
        setSeletedSubID([]);

        // Reset new fields
        setSeason("");
        setFabricType("");
        setDeliveryStartDate("");
        setDeliveryEndDate("");
        setDeliveryDays(0);
        setCurrency("USD");
        setVariants([]);

        notify("تم إضافة المنتج بنجاح", "success");
      } else if (product.status >= 400) {
        // Extract detailed error message
        let errorMessage = "حدث خطأ أثناء إضافة المنتج";

        // Check for validation errors
        if (product.data?.errors && Array.isArray(product.data.errors)) {
          const errorMessages = product.data.errors.map((err) => {
            if (err.msg) return err.msg;
            if (err.message) return err.message;
            return err;
          });
          errorMessage = errorMessages.join(" | ");
        } else if (product.data?.message) {
          errorMessage = product.data.message;
        } else if (product.data?.error) {
          errorMessage = product.data.error;
        } else if (typeof product.data === "string") {
          errorMessage = product.data;
        }

        // Show specific error messages based on status code
        if (product.status === 400) {
          errorMessage = `خطأ في البيانات: ${errorMessage}`;
        } else if (product.status === 401) {
          errorMessage = "غير مصرح لك بإضافة منتج. يرجى تسجيل الدخول مرة أخرى";
        } else if (product.status === 403) {
          errorMessage = "ليس لديك صلاحية لإضافة منتج";
        } else if (product.status === 404) {
          errorMessage = "الرابط غير موجود أو غير صحيح";
        } else if (product.status === 409) {
          errorMessage = `تعارض: ${errorMessage}`;
        } else if (product.status === 413) {
          errorMessage =
            "حجم الصور كبير جداً. يرجى تصغير الصور والمحاولة مرة أخرى";
        } else if (product.status === 422) {
          errorMessage = `خطأ في التحقق من البيانات: ${errorMessage}`;
        } else if (product.status >= 500) {
          errorMessage = "خطأ في السيرفر. يرجى المحاولة لاحقاً";
        }

        notify(errorMessage, "error");
      }
    }
  }, [loading, product]);

  return [
    onChangeDesName,
    onChangeQty,
    onChangePriceAfter,
    onChangePriceBefor,
    onChangeProdName,
    onChangeProductUrl,
    category,
    brand,
    store,
    priceAftr,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    onSeletCategory,
    handelSubmit,
    onSeletBrand,
    onSeletStore,
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
    // New fields exports
    season,
    fabricType,
    deliveryStartDate,
    deliveryEndDate,
    deliveryDays,
    currency,
    onChangeSeason,
    onChangeFabricType,
    onChangeDeliveryStartDate,
    onChangeDeliveryEndDate,
    onChangeDeliveryDays,
    onChangeCurrency,
    // Secondary categories
    secondaryCatID,
    onSelectSecondary,
    onRemoveSecondary,
    secondaryOptions,
    // Cover image
    imageCover,
    setImageCover,
    // Sizes
    availableSizes,
    addVariantSizeFromList,
    addAllAvailableSizes,
    // Colors
    availableColors,
    addVariantFromColor,
  ];
};

export default AdminAddProductsHook;
