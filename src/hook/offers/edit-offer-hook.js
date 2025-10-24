import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateOffer } from "../../redux/actions/offerAction";
import { toast } from "react-toastify";

export const useEditOffer = (offer, onSuccess) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isPress, setIsPress] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: "",
    icon: "🎯",
    color: {
      primary: "#ff6b6b",
      secondary: "#ee5a24",
    },
    image: null,
    isActive: true,
    startDate: "",
    endDate: "",
    priority: 1,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [img, setImg] = useState("");

  useEffect(() => {
    if (offer) {
      setFormData({
        title: offer.title || "",
        description: offer.description || "",
        discount: offer.discount || "",
        icon: offer.icon || "🎯",
        color: {
          primary: offer.color?.primary || "#ff6b6b",
          secondary: offer.color?.secondary || "#ee5a24",
        },
        image: offer.image || null,
        isActive: offer.isActive || true,
        startDate: offer.startDate
          ? new Date(offer.startDate).toISOString().split("T")[0]
          : "",
        endDate: offer.endDate
          ? new Date(offer.endDate).toISOString().split("T")[0]
          : "",
        priority: offer.priority || 1,
      });
      setImg(offer.image || "");
    }
  }, [offer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("يرجى اختيار ملف صورة صالح");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
        return;
      }

      setSelectedFile(file);
      setImg(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error("يرجى إدخال عنوان العرض");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("يرجى إدخال وصف العرض");
      return;
    }

    if (!formData.discount.trim()) {
      toast.error("يرجى إدخال نسبة الخصم");
      return;
    }

    if (!formData.startDate) {
      toast.error("يرجى إدخال تاريخ البداية");
      return;
    }

    if (!formData.endDate) {
      toast.error("يرجى إدخال تاريخ النهاية");
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast.error("تاريخ النهاية يجب أن يكون بعد تاريخ البداية");
      return;
    }

    setLoading(true);
    setIsPress(true);

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("discount", formData.discount);
      submitData.append("icon", formData.icon);
      submitData.append("color[primary]", formData.color.primary);
      submitData.append("color[secondary]", formData.color.secondary);
      submitData.append("isActive", formData.isActive);
      submitData.append("startDate", formData.startDate);
      submitData.append("endDate", formData.endDate);
      submitData.append("priority", formData.priority);

      if (selectedFile) {
        submitData.append("image", selectedFile);
      }

      const response = await dispatch(updateOffer(offer._id, submitData));

      if (response.payload) {
        toast.success("تم تحديث العرض بنجاح");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error("حدث خطأ في تحديث العرض");
      }
    } catch (error) {
      toast.error(error.message || "حدث خطأ في تحديث العرض");
    } finally {
      setLoading(false);
      setIsPress(false);
    }
  };

  return {
    formData,
    setFormData,
    selectedFile,
    setSelectedFile,
    img,
    setImg,
    loading,
    isPress,
    handleChange,
    handleImageChange,
    handleSubmit,
  };
};
