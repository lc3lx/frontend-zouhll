// Image Helper Utility
// مساعد لعرض الصور من الـ Backend

const BACKEND_URL = "https://backend-zouhal.onrender.com";

/**
 * تحويل مسار الصورة النسبي إلى مسار كامل
 * @param {string} imagePath - مسار الصورة النسبي من الـ API
 * @returns {string} - المسار الكامل للصورة
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "/images/placeholder.png"; // صورة افتراضية
  }

  // إذا كانت الصورة تبدأ بـ http أو https (رابط كامل)
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // إذا كانت الصورة تبدأ بـ /
  if (imagePath.startsWith("/")) {
    return `${BACKEND_URL}${imagePath}`;
  }

  // إذا كانت الصورة مسار نسبي
  return `${BACKEND_URL}/${imagePath}`;
};

/**
 * معالجة صورة المنتج
 * @param {object} product - المنتج
 * @returns {string} - رابط صورة الغلاف
 */
export const getProductImage = (product) => {
  if (product?.imageCover) {
    return getImageUrl(product.imageCover);
  }
  if (product?.images && product.images.length > 0) {
    return getImageUrl(product.images[0]);
  }
  return "/images/item.png"; // صورة افتراضية للمنتج
};

/**
 * معالجة صورة التصنيف
 * @param {object} category - التصنيف
 * @returns {string} - رابط الصورة
 */
export const getCategoryImage = (category) => {
  if (category?.image) {
    return getImageUrl(category.image);
  }
  return "/images/cat2.png"; // صورة افتراضية للتصنيف
};

/**
 * معالجة صورة الماركة
 * @param {object} brand - الماركة
 * @returns {string} - رابط الصورة
 */
export const getBrandImage = (brand) => {
  if (brand?.image) {
    return getImageUrl(brand.image);
  }
  return "/images/brand1.png"; // صورة افتراضية للماركة
};

/**
 * معالجة معرض صور المنتج
 * @param {object} product - المنتج
 * @returns {array} - مصفوفة بصيغة react-image-gallery
 */
export const getProductGalleryImages = (product) => {
  if (product?.images && Array.isArray(product.images)) {
    return product.images.map((img) => ({
      original: getImageUrl(img),
      thumbnail: getImageUrl(img),
    }));
  }
  if (product?.imageCover) {
    return [
      {
        original: getImageUrl(product.imageCover),
        thumbnail: getImageUrl(product.imageCover),
      },
    ];
  }
  return [
    {
      original: "/images/item.png",
      thumbnail: "/images/item.png",
    },
  ];
};

export default {
  getImageUrl,
  getProductImage,
  getCategoryImage,
  getBrandImage,
  getProductGalleryImages,
};
