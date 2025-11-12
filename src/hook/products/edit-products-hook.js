import { useState, useEffect } from "react";
import { getOneCategory } from "../../redux/actions/subcategoryAction";
import { getOneProduct } from "../../redux/actions/productsAction";
import notify from "./../../hook/useNotifaction";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "./../../redux/actions/brandAction";
import { getAllStore } from "./../../redux/actions/storeAction";
import { updateProducts } from "./../../redux/actions/productsAction";
import { getSizesByCategory } from "../../redux/actions/sizeAction";
import { getColorsByCategory } from "../../redux/actions/colorAction";
import { useGetData as getData } from "../../hooks/useGetData";

const AdminEditProductsHook = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) return;
    const run = async () => {
      await dispatch(getOneProduct(id));
      await dispatch(getAllCategory(100)); // إضافة limit
      await dispatch(getAllBrand());
      await dispatch(getAllStore());
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //get one product details
  const item = useSelector((state) => state.allproducts.oneProduct);
  //get last catgeory state from redux
  const category = useSelector((state) => state.allCategory.category);
  //get last brand state from redux
  const brand = useSelector((state) => state.allBrand.brand);
  //get last store state from redux
  const store = useSelector((state) => state.allStore.store);

  //get last sub cat state from redux
  const subCat = useSelector((state) => state.subCategory.subcategory);

  const onSelect = (selectedList) => {
    setSeletedSubID(selectedList);
  };
  const onRemove = (selectedList) => {
    setSeletedSubID(selectedList);
  };

  const [options, setOptions] = useState([]);

  // Ensure options is always an array
  useEffect(() => {
    if (!Array.isArray(options)) {
      setOptions([]);
    }
  }, [options]);

  // Cover image state - separate from variant images
  const [imageCover, setImageCover] = useState(null);
  //values state
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState("");
  const [priceAftr, setPriceAftr] = useState("");
  const [qty, setQty] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [CatID, setCatID] = useState("0");
  const [BrandID, SetBrandID] = useState("0");
  const [StoreID, SetStoreID] = useState("0");
  const [seletedSubID, setSeletedSubID] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState([]); // للتصنيف الرئيسي كـ Multiselect
  const [loading, setLoading] = useState(true);

  // New fields state
  const [season, setSeason] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [deliveryStartDate, setDeliveryStartDate] = useState("");
  const [deliveryEndDate, setDeliveryEndDate] = useState("");
  const [deliveryDays, setDeliveryDays] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [secondaryCatID, setSecondaryCatID] = useState([]);

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

  // Variant builder state (for edit)
  const [variants, setVariants] = useState([]);
  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
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

  useEffect(() => {
    let isMounted = true;

    if (item && item.data) {
      console.log("Product data:", item.data);

      // تحميل صورة الغلاف منفصلة
      if (item.data.imageCover) {
        setImageCover(item.data.imageCover);
        console.log("Image cover loaded:", item.data.imageCover);
      }

      // تحميل الصور الأخرى (للمنتجات القديمة - يمكن إزالتها لاحقاً)
      // في النظام الجديد، الصور تكون في variants فقط

      setProdName(item.data.title || "");
      setProdDescription(item.data.description || "");
      setPriceBefore(item.data.price || "");
      setPriceAftr(item.data.priceAfterDiscount || "");
      setQty(item.data.quantity || "");
      setProductUrl(item.data.productUrl || "");

      // Load new fields
      setSeason(item.data.season || "");
      setFabricType(item.data.fabricType || "");

      // تحميل delivery dates
      if (item.data.deliveryStartDate) {
        setDeliveryStartDate(item.data.deliveryStartDate);
      }
      if (item.data.deliveryEndDate) {
        setDeliveryEndDate(item.data.deliveryEndDate);
      }
      if (item.data.deliveryDays) {
        setDeliveryDays(item.data.deliveryDays);
      }

      setCurrency(item.data.currency || "USD");

      // إصلاح تحديد التصنيف
      if (item.data.category) {
        const categoryObj = item.data.category;
        let categoryId =
          typeof categoryObj === "object" ? categoryObj._id : categoryObj;

        // إذا لم يكن هناك _id ولكن هناك name، ابحث عن التصنيف بالاسم
        if (
          !categoryId &&
          typeof categoryObj === "object" &&
          categoryObj.name
        ) {
          console.log(
            "⚠️ Category has no _id, searching by name:",
            categoryObj.name
          );
          // سننتظر تحميل قائمة التصنيفات في useEffect آخر
        }

        const finalCategoryId = String(categoryId || "0");

        setCatID(finalCategoryId);
        console.log("Category ID set to:", finalCategoryId);
        console.log("Category object:", categoryObj);

        // تعيين التصنيف المحدد كـ array of objects للـ Multiselect
        if (finalCategoryId !== "0" && typeof categoryObj === "object") {
          const mainCatToSet = [
            {
              _id: categoryObj._id,
              name: categoryObj.name || "تصنيف",
            },
          ];
          setSelectedMainCategory(mainCatToSet);
          console.log(
            "🔵 Set selectedMainCategory (from object):",
            mainCatToSet
          );
        } else if (finalCategoryId !== "0") {
          // إذا كان ID فقط، سنضع placeholder حتى يتم تحميل البيانات الكاملة
          const mainCatToSet = [
            {
              _id: finalCategoryId,
              name: "جاري التحميل...",
            },
          ];
          setSelectedMainCategory(mainCatToSet);
          console.log("🔵 Set selectedMainCategory (ID only):", mainCatToSet);
        }

        // جلب التصنيفات الفرعية للتصنيف الرئيسي فوراً
        if (finalCategoryId !== "0") {
          getData(`/api/v1/categories/${finalCategoryId}/subcategories`)
            .then((response) => {
              if (response && response.data) {
                setOptions(response.data);
                console.log(
                  "Subcategories options loaded immediately:",
                  response.data
                );
              }
            })
            .catch((error) => {
              console.error("Error loading subcategories options:", error);
            });
        }
      } else {
        console.log("No category found in product data");
        setCatID("0");
        setSelectedMainCategory([]);
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

      // إصلاح تحديد المتجر
      if (item.data.store) {
        const storeId =
          typeof item.data.store === "object"
            ? item.data.store._id
            : item.data.store;
        SetStoreID(storeId || "0");
        console.log("Store ID set to:", storeId);
      }

      // الألوان موجودة في variants فقط - لا حاجة لـ colors منفصلة

      // معالجة التصنيفات الفرعية - تحميل البيانات الكاملة
      const loadSubcategories = async () => {
        const subcategoriesData =
          item.data.subcategories || item.data.subcategory || [];
        if (Array.isArray(subcategoriesData) && subcategoriesData.length > 0) {
          try {
            // إذا كانت IDs فقط، نحتاج إلى جلب البيانات الكاملة
            const subcategoryIds = subcategoriesData
              .map((sub) => (typeof sub === "object" ? sub._id : sub))
              .filter(Boolean);

            if (subcategoryIds.length > 0) {
              // جلب التصنيفات الفرعية الكاملة
              const subcategoryPromises = subcategoryIds.map((id) =>
                getData(`/api/v1/subcategories/${id}`).catch(() => null)
              );
              const subcategoryResults = await Promise.all(subcategoryPromises);
              const fullSubcategories = subcategoryResults
                .filter((res) => res && res.data)
                .map((res) => res.data);

              if (fullSubcategories.length > 0) {
                if (isMounted) {
                  setSeletedSubID(fullSubcategories);
                  // تحديث options مباشرة
                  setOptions(fullSubcategories);
                  console.log("Subcategories loaded:", fullSubcategories);
                }
                // إرجاع التصنيفات الفرعية المحملة
                return fullSubcategories;
              } else {
                // إذا فشل الجلب، استخدم البيانات المتاحة
                const validSubcategories = subcategoriesData.filter(
                  (sub) => typeof sub === "object" && sub._id
                );
                if (isMounted) {
                  setSeletedSubID(validSubcategories);
                  setOptions(validSubcategories);
                }
                return validSubcategories;
              }
            } else {
              const validSubcategories = subcategoriesData.filter(
                (sub) => typeof sub === "object" && sub._id
              );
              if (isMounted) {
                setSeletedSubID(validSubcategories);
                setOptions(validSubcategories);
              }
              return validSubcategories;
            }
          } catch (error) {
            console.error("Error loading subcategories:", error);
            // استخدم البيانات المتاحة
            const validSubcategories = subcategoriesData.filter(
              (sub) => typeof sub === "object" && sub._id
            );
            if (isMounted) {
              setSeletedSubID(validSubcategories);
              setOptions(validSubcategories);
            }
            return validSubcategories;
          }
        } else {
          // إذا لم تكن هناك تصنيفات فرعية، جلب جميع التصنيفات الفرعية للتصنيف الرئيسي
          const categoryId =
            typeof item.data.category === "object"
              ? item.data.category._id
              : item.data.category;
          if (categoryId && categoryId !== "0") {
            try {
              const response = await getData(
                `/api/v1/categories/${categoryId}/subcategories`
              );
              if (response && response.data && isMounted) {
                setOptions(response.data);
                console.log("Subcategories options loaded:", response.data);
              }
            } catch (error) {
              console.error("Error loading subcategories options:", error);
            }
          }
          return [];
        }
      };

      // معالجة التصنيفات الثانوية - تحميل البيانات الكاملة
      const loadSecondaryCategories = async (loadedSubcategories = null) => {
        const secondaryCategoriesData = item.data.secondaryCategories || [];

        // جلب جميع التصنيفات الثانوية المتاحة للتصنيفات الفرعية المحملة
        const loadSecondaryOptions = async (subcategoriesToUse) => {
          const currentSubcategories = subcategoriesToUse || seletedSubID || [];
          if (currentSubcategories.length > 0) {
            try {
              const subcategoryIds = currentSubcategories
                .map((sub) => (typeof sub === "object" ? sub._id : sub))
                .filter(Boolean);

              if (subcategoryIds.length > 0) {
                const secondaryPromises = subcategoryIds.map((id) =>
                  getData(
                    `/api/v1/subcategories/${id}/secondary-categories`
                  ).catch(() => null)
                );
                const secondaryResults = await Promise.all(secondaryPromises);
                const merged = [];
                const seen = new Set();
                secondaryResults.forEach((res) => {
                  if (res && res.data && Array.isArray(res.data)) {
                    res.data.forEach((sc) => {
                      if (sc && sc._id && !seen.has(sc._id)) {
                        seen.add(sc._id);
                        merged.push(sc);
                      }
                    });
                  }
                });
                if (merged.length > 0 && isMounted) {
                  setSecondaryOptions(merged);
                  console.log("Secondary categories options loaded:", merged);
                }
              }
            } catch (error) {
              console.error(
                "Error loading secondary categories options:",
                error
              );
            }
          }
        };

        if (
          Array.isArray(secondaryCategoriesData) &&
          secondaryCategoriesData.length > 0
        ) {
          try {
            // تصفية القيم null و undefined
            const validSecondaryCategories = secondaryCategoriesData.filter(
              (cat) =>
                cat !== null &&
                cat !== undefined &&
                (typeof cat === "object" ? cat._id : cat)
            );

            if (validSecondaryCategories.length > 0) {
              // إذا كانت IDs فقط، نحتاج إلى جلب البيانات الكاملة
              const secondaryIds = validSecondaryCategories
                .map((cat) => (typeof cat === "object" ? cat._id : cat))
                .filter(Boolean);

              if (secondaryIds.length > 0) {
                // جلب التصنيفات الثانوية الكاملة
                const secondaryPromises = secondaryIds.map((id) =>
                  getData(`/api/v1/secondary-categories/${id}`).catch(
                    () => null
                  )
                );
                const secondaryResults = await Promise.all(secondaryPromises);
                const fullSecondaryCategories = secondaryResults
                  .filter((res) => res && res.data)
                  .map((res) => res.data);

                if (fullSecondaryCategories.length > 0) {
                  if (isMounted) {
                    setSecondaryCatID(fullSecondaryCategories);
                    console.log(
                      "Secondary categories loaded:",
                      fullSecondaryCategories
                    );
                  }
                } else {
                  // إذا فشل الجلب، استخدم البيانات المتاحة
                  const validCats = validSecondaryCategories.filter(
                    (cat) => typeof cat === "object" && cat._id
                  );
                  if (isMounted) {
                    setSecondaryCatID(validCats);
                  }
                }
              } else {
                const validCats = validSecondaryCategories.filter(
                  (cat) => typeof cat === "object" && cat._id
                );
                if (isMounted) {
                  setSecondaryCatID(validCats);
                }
              }
            }
          } catch (error) {
            console.error("Error loading secondary categories:", error);
            // استخدم البيانات المتاحة
            const validSecondaryCategories = secondaryCategoriesData.filter(
              (cat) =>
                cat !== null &&
                cat !== undefined &&
                (typeof cat === "object" ? cat._id : cat)
            );
            const validCats = validSecondaryCategories.filter(
              (cat) => typeof cat === "object" && cat._id
            );
            if (isMounted) {
              setSecondaryCatID(validCats);
            }
          }
        }

        // جلب جميع التصنيفات الثانوية المتاحة
        await loadSecondaryOptions(loadedSubcategories);
      };

      // تحميل التصنيفات الفرعية والثانوية
      // انتظر تحميل التصنيف الرئيسي أولاً
      const categoryId =
        typeof item.data.category === "object"
          ? item.data.category._id
          : item.data.category;

      if (categoryId && categoryId !== "0") {
        // جلب التصنيفات الفرعية للتصنيف الرئيسي
        getData(`/api/v1/categories/${categoryId}/subcategories`)
          .then((response) => {
            if (response && response.data && isMounted) {
              setOptions(response.data);
              console.log("Subcategories options loaded:", response.data);
            }
            // ثم تحميل التصنيفات الفرعية والثانوية المحددة
            if (isMounted) {
              return loadSubcategories();
            }
            return [];
          })
          .then(async (loadedSubcategories) => {
            // بعد تحميل التصنيفات الفرعية، جلب التصنيفات الثانوية
            // استخدام التصنيفات الفرعية المحملة
            if (isMounted) {
              await loadSecondaryCategories(loadedSubcategories || []);
            }
          })
          .catch((error) => {
            console.error("Error loading subcategories options:", error);
            // تحميل التصنيفات الفرعية والثانوية حتى لو فشل جلب options
            if (isMounted) {
              loadSubcategories().then(async (loadedSubcategories) => {
                if (isMounted) {
                  await loadSecondaryCategories(loadedSubcategories || []);
                }
              });
            }
          });
      } else {
        // إذا لم يكن هناك تصنيف رئيسي، تحميل التصنيفات الفرعية والثانوية مباشرة
        if (isMounted) {
          loadSubcategories().then(async (loadedSubcategories) => {
            if (isMounted) {
              await loadSecondaryCategories(loadedSubcategories || []);
            }
          });
        }
      }

      // معالجة variants مع الصور
      if (Array.isArray(item.data.variants)) {
        // جلب الألوان المتاحة أولاً للتحقق منها
        const categoryId =
          typeof item.data.category === "object"
            ? item.data.category._id
            : item.data.category;

        const loadVariantsWithColors = async () => {
          let colorsList = [];
          if (categoryId && categoryId !== "0") {
            try {
              const colorsRes = await getData(
                `/api/v1/colors/category/${categoryId}`
              );
              colorsList = colorsRes?.data || [];
            } catch (e) {
              console.warn("Could not load colors for category", e);
            }
          }

          const init = item.data.variants.map((v, index) => {
            // تحميل الصور من variant إذا كانت موجودة
            const variantImages =
              Array.isArray(v.images) && v.images.length > 0 ? v.images : {};

            const colorHex =
              typeof v?.color === "string"
                ? v.color
                : v?.color?.hex || "#000000";

            // البحث عن اللون في القائمة الجاهزة
            const matchedColor = colorsList.find(
              (c) => c.hex.toLowerCase() === colorHex.toLowerCase()
            );

            return {
              colorHex,
              colorId: matchedColor?._id || null,
              colorName: matchedColor?.name || null,
              price: v?.price || "",
              sku: v?.sku || "",
              images: variantImages,
              sizes: Array.isArray(v?.sizes)
                ? v.sizes.map((s) => ({ label: s.label, stock: s.stock }))
                : [],
            };
          });

          if (isMounted) {
            setVariants(init);
            console.log("Variants loaded:", init);
          }
        };

        loadVariantsWithColors();
      }
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // الألوان موجودة في variants فقط - لا حاجة لـ onChangeColor

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

  // Secondary category handlers
  const onSelectSecondary = (selectedList) => setSecondaryCatID(selectedList);
  const onRemoveSecondary = (selectedList) => setSecondaryCatID(selectedList);

  // Main category handlers for Multiselect
  const onSelectMainCategory = async (selectedList) => {
    setSelectedMainCategory(selectedList);
    const selected = selectedList && selectedList[0];
    const val = selected ? String(selected._id || selected.id || "0") : "0";
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

  const onRemoveMainCategory = () => {
    setSelectedMainCategory([]);
    setCatID("0");
    setOptions([]);
    setSeletedSubID([]);
    setSecondaryCatID([]);
    setSecondaryOptions([]);
  };

  // الألوان موجودة في variants فقط - لا حاجة لـ colors منفصلة

  //when selet category store id (قديمة - تم استبدالها بـ onSelectMainCategory)
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

  const onSeletBrand = (e) => {
    SetBrandID(e.target.value);
  };

  const onSeletStore = (e) => {
    SetStoreID(e.target.value);
  };

  useEffect(() => {
    if (CatID && CatID !== "0") {
      if (subCat && subCat.data) {
        setOptions(subCat.data);
      }
    } else {
      setOptions([]);
    }
  }, [CatID, subCat]);

  // تحديث selectedMainCategory عند تحميل قائمة التصنيفات
  // هذا useEffect يعمل فقط عندما تكون category.data محملة ولديها عناصر
  useEffect(() => {
    console.log("=== useEffect for selectedMainCategory ===");
    console.log("Category state:", category);
    console.log("Category data length:", category?.data?.length);
    console.log("CatID:", CatID);
    console.log("Current selectedMainCategory:", selectedMainCategory);
    console.log("Item category:", item?.data?.category);

    // فقط إذا كانت قائمة التصنيفات محملة
    if (
      category?.data &&
      Array.isArray(category.data) &&
      category.data.length > 0
    ) {
      // إذا كان CatID = "0" ولكن item.data.category موجود بـ name فقط
      if (CatID === "0" && item?.data?.category) {
        const categoryObj = item.data.category;
        if (
          typeof categoryObj === "object" &&
          categoryObj.name &&
          !categoryObj._id
        ) {
          console.log("🔍 Searching for category by name:", categoryObj.name);
          // ابحث عن التصنيف بالاسم
          const foundByName = category.data.find(
            (cat) => cat.name === categoryObj.name
          );

          if (foundByName) {
            console.log("✅ Found category by name:", foundByName);
            setCatID(String(foundByName._id));
            setSelectedMainCategory([
              {
                _id: foundByName._id,
                name: foundByName.name,
              },
            ]);

            // جلب التصنيفات الفرعية
            if (foundByName._id) {
              dispatch(getOneCategory(foundByName._id));
            }
            return;
          }
        }
      }

      if (CatID && CatID !== "0") {
        const foundCategory = category.data.find(
          (cat) => String(cat._id) === String(CatID)
        );
        console.log("Found category in list:", foundCategory);

        if (foundCategory) {
          // تحديث selectedMainCategory بالبيانات الكاملة فقط إذا لم يكن محدداً بالفعل
          // أو إذا كان مختلفاً عن الحالي
          const needsUpdate =
            selectedMainCategory.length === 0 ||
            selectedMainCategory[0]._id !== foundCategory._id ||
            selectedMainCategory[0].name !== foundCategory.name;

          if (needsUpdate) {
            const mainCatToSet = [
              {
                _id: foundCategory._id,
                name: foundCategory.name,
              },
            ];
            setSelectedMainCategory(mainCatToSet);
            console.log("✅ Updated selectedMainCategory:", mainCatToSet);
          } else {
            console.log("✅ selectedMainCategory already correct");
          }
        } else {
          console.warn("❌ CatID not found in category list:", CatID);
        }
      } else if (CatID === "0" && selectedMainCategory.length > 0) {
        console.log("⚠️ CatID is 0, clearing selectedMainCategory");
        setSelectedMainCategory([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, CatID, selectedMainCategory, item]);

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
    const metadata = { type: `image/${ext}` };
    return new File([data], Math.random(), metadata);
  };

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
    if (!imageCover) {
      notify("يجب إضافة صورة الغلاف للمنتج", "warn");
      return;
    }

    // Convert imageCover to File if it's a base64 string
    let imgCover;
    if (typeof imageCover === "string") {
      if (imageCover.length <= 1000) {
        // URL
        imgCover = await convertURLtoFile(imageCover);
      } else {
        // Base64
        imgCover = dataURLtoFile(imageCover, Math.random() + ".png");
      }
    } else if (imageCover instanceof File) {
      imgCover = imageCover;
    } else {
      notify("صورة الغلاف غير صحيحة", "warn");
      return;
    }

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

    setLoading(true);
    await dispatch(updateProducts(id, formData));
    setLoading(false);
  };

  //get create meesage
  const product = useSelector((state) => state.allproducts.updateProducts);

  useEffect(() => {
    if (loading === false && product) {
      if (product.status === 200) {
        notify("تم التعديل بنجاح", "success");
      } else {
        notify("هناك مشكله", "error");
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
    seletedSubID, // إضافة seletedSubID للعرض في Multiselect
    // IDs for selects
    CatID,
    BrandID,
    StoreID,
    // Main category Multiselect
    selectedMainCategory,
    onSelectMainCategory,
    onRemoveMainCategory,
    // Sizes
    availableSizes,
    addVariantSizeFromList,
    addAllAvailableSizes,
    // Colors
    availableColors,
    addVariantFromColor,
  ];
};

export default AdminEditProductsHook;
