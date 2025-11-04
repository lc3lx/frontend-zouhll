// Image Helper Utility
// مساعد لعرض الصور من الـ Backend

const BACKEND_URL = "https://www.zuhall.com";

/**
 * تحويل مسار الصورة النسبي إلى مسار كامل
 * @param {string} imagePath - مسار الصورة النسبي من الـ API
 * @returns {string} - المسار الكامل للصورة
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "/images/placeholder.png"; // صورة افتراضية
  }

  // تنظيف المسار من المسافات الزائدة
  const cleanPath = imagePath.toString().trim();

  // إذا كانت الصورة تبدأ بـ http أو https (رابط كامل)
  if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
    return cleanPath;
  }

  // إذا كانت الصورة تبدأ بـ /
  if (cleanPath.startsWith("/")) {
    return `${BACKEND_URL}${cleanPath}`;
  }

  // إذا كانت الصورة مسار نسبي
  return `${BACKEND_URL}/${cleanPath}`;
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
 * معالجة صورة المتجر
 * @param {object} store - المتجر
 * @returns {string} - رابط الصورة
 */
export const getStoreImage = (store) => {
  if (store?.logo) {
    return getImageUrl(store.logo);
  }
  return "/images/store.png"; // صورة افتراضية للمتجر
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

const imageHelper = {
  getImageUrl,
  getProductImage,
  getCategoryImage,
  getBrandImage,
  getStoreImage,
  getProductGalleryImages,
};

export default imageHelper;
