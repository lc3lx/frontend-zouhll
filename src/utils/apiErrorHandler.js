// API Error Handler Utility
// معالج شامل لأخطاء الـ API

export const handleApiError = (error, fallbackValue = null) => {
  if (!error) return fallbackValue;

  // معالجة 429 Too Many Requests
  if (error.response && error.response.status === 429) {
    console.warn("⚠️ Too Many Requests - يرجى الانتظار قليلاً");
    // يمكن إضافة notification هنا
    return fallbackValue;
  }

  // معالجة 403 Forbidden
  if (error.response && error.response.status === 403) {
    console.warn("⚠️ Forbidden - لا توجد صلاحيات كافية");
    return fallbackValue;
  }

  // معالجة 404 Not Found
  if (error.response && error.response.status === 404) {
    console.warn("⚠️ Not Found - لم يتم العثور على المورد");
    return fallbackValue;
  }

  // معالجة 500 Server Error
  if (error.response && error.response.status >= 500) {
    console.error("❌ Server Error - خطأ في الخادم");
    return fallbackValue;
  }

  // معالجة Network Error
  if (error.message === "Network Error") {
    console.error("❌ Network Error - تحقق من الاتصال بالإنترنت");
    return fallbackValue;
  }

  console.error("Error:", error);
  return fallbackValue;
};

// التحقق من أن البيانات array
export const ensureArray = (data) => {
  return Array.isArray(data) ? data : [];
};

// التحقق من أن البيانات object
export const ensureObject = (data) => {
  return data && typeof data === "object" && !Array.isArray(data) ? data : {};
};

// Delay function للـ retry
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retry function مع backoff
export const retryWithBackoff = async (fn, retries = 3, delayMs = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0 || (error.response && error.response.status !== 429)) {
      throw error;
    }

    console.log(`⏳ Retrying in ${delayMs}ms... (${retries} retries left)`);
    await delay(delayMs);
    return retryWithBackoff(fn, retries - 1, delayMs * 2);
  }
};
