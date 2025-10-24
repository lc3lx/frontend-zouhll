/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Format a date string to a readable format
 * @param {string|Date} date - The date to format
 * @param {string} locale - The locale to use (default: 'ar-SA')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = "ar-SA") => {
  if (!date) return "";

  try {
    const dateObj = new Date(date);

    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return "تاريخ غير صحيح";
    }

    // Format options for Arabic locale
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return dateObj.toLocaleDateString(locale, options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "تاريخ غير صحيح";
  }
};

/**
 * Format a date to a short format (DD/MM/YYYY)
 * @param {string|Date} date - The date to format
 * @returns {string} Short formatted date string
 */
export const formatDateShort = (date) => {
  if (!date) return "";

  try {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      return "تاريخ غير صحيح";
    }

    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error formatting short date:", error);
    return "تاريخ غير صحيح";
  }
};

/**
 * Format a date to time only (HH:MM)
 * @param {string|Date} date - The date to format
 * @returns {string} Time string
 */
export const formatTime = (date) => {
  if (!date) return "";

  try {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      return "وقت غير صحيح";
    }

    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "وقت غير صحيح";
  }
};

/**
 * Get relative time (e.g., "2 hours ago", "3 days ago")
 * @param {string|Date} date - The date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return "";

  try {
    const dateObj = new Date(date);
    const now = new Date();

    if (isNaN(dateObj.getTime())) {
      return "تاريخ غير صحيح";
    }

    const diffInSeconds = Math.floor((now - dateObj) / 1000);

    if (diffInSeconds < 60) {
      return "الآن";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `منذ ${minutes} دقيقة`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `منذ ${hours} ساعة`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `منذ ${days} يوم`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `منذ ${months} شهر`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `منذ ${years} سنة`;
    }
  } catch (error) {
    console.error("Error getting relative time:", error);
    return "تاريخ غير صحيح";
  }
};

/**
 * Check if a date is in the past
 * @param {string|Date} date - The date to check
 * @returns {boolean} True if date is in the past
 */
export const isPastDate = (date) => {
  if (!date) return false;

  try {
    const dateObj = new Date(date);
    const now = new Date();

    if (isNaN(dateObj.getTime())) {
      return false;
    }

    return dateObj < now;
  } catch (error) {
    console.error("Error checking past date:", error);
    return false;
  }
};

/**
 * Check if a date is in the future
 * @param {string|Date} date - The date to check
 * @returns {boolean} True if date is in the future
 */
export const isFutureDate = (date) => {
  if (!date) return false;

  try {
    const dateObj = new Date(date);
    const now = new Date();

    if (isNaN(dateObj.getTime())) {
      return false;
    }

    return dateObj > now;
  } catch (error) {
    console.error("Error checking future date:", error);
    return false;
  }
};

/**
 * Get the number of days between two dates
 * @param {string|Date} startDate - The start date
 * @param {string|Date} endDate - The end date
 * @returns {number} Number of days between dates
 */
export const getDaysBetween = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 0;
    }

    const diffInTime = end.getTime() - start.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    return diffInDays;
  } catch (error) {
    console.error("Error calculating days between dates:", error);
    return 0;
  }
};

/**
 * Add days to a date
 * @param {string|Date} date - The base date
 * @param {number} days - Number of days to add
 * @returns {Date} New date with added days
 */
export const addDays = (date, days) => {
  if (!date) return new Date();

  try {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      return new Date();
    }

    dateObj.setDate(dateObj.getDate() + days);
    return dateObj;
  } catch (error) {
    console.error("Error adding days to date:", error);
    return new Date();
  }
};

/**
 * Get the start of the day for a date
 * @param {string|Date} date - The date to get start of day for
 * @returns {Date} Start of day date
 */
export const getStartOfDay = (date) => {
  if (!date) return new Date();

  try {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      return new Date();
    }

    dateObj.setHours(0, 0, 0, 0);
    return dateObj;
  } catch (error) {
    console.error("Error getting start of day:", error);
    return new Date();
  }
};

/**
 * Get the end of the day for a date
 * @param {string|Date} date - The date to get end of day for
 * @returns {Date} End of day date
 */
export const getEndOfDay = (date) => {
  if (!date) return new Date();

  try {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      return new Date();
    }

    dateObj.setHours(23, 59, 59, 999);
    return dateObj;
  } catch (error) {
    console.error("Error getting end of day:", error);
    return new Date();
  }
};

/**
 * Check if a date is today
 * @param {string|Date} date - The date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  if (!date) return false;

  try {
    const dateObj = new Date(date);
    const today = new Date();

    if (isNaN(dateObj.getTime())) {
      return false;
    }

    return dateObj.toDateString() === today.toDateString();
  } catch (error) {
    console.error("Error checking if date is today:", error);
    return false;
  }
};

/**
 * Check if a date is tomorrow
 * @param {string|Date} date - The date to check
 * @returns {boolean} True if date is tomorrow
 */
export const isTomorrow = (date) => {
  if (!date) return false;

  try {
    const dateObj = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (isNaN(dateObj.getTime())) {
      return false;
    }

    return dateObj.toDateString() === tomorrow.toDateString();
  } catch (error) {
    console.error("Error checking if date is tomorrow:", error);
    return false;
  }
};

/**
 * Check if a date is yesterday
 * @param {string|Date} date - The date to check
 * @returns {boolean} True if date is yesterday
 */
export const isYesterday = (date) => {
  if (!date) return false;

  try {
    const dateObj = new Date(date);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (isNaN(dateObj.getTime())) {
      return false;
    }

    return dateObj.toDateString() === yesterday.toDateString();
  } catch (error) {
    console.error("Error checking if date is yesterday:", error);
    return false;
  }
};

/**
 * Convert number to Arabic text representation
 * @param {number} num - The number to convert
 * @returns {string} Arabic text representation
 */
const numberToArabicText = (num) => {
  const arabicNumbers = {
    0: "صفر",
    1: "واحد",
    2: "اثنان",
    3: "ثلاثة",
    4: "أربعة",
    5: "خمسة",
    6: "ستة",
    7: "سبعة",
    8: "ثمانية",
    9: "تسعة",
    10: "عشرة",
    11: "أحد عشر",
    12: "اثنا عشر",
    13: "ثلاثة عشر",
    14: "أربعة عشر",
    15: "خمسة عشر",
    16: "ستة عشر",
    17: "سبعة عشر",
    18: "ثمانية عشر",
    19: "تسعة عشر",
    20: "عشرون",
    21: "واحد وعشرون",
    22: "اثنان وعشرون",
    23: "ثلاثة وعشرون",
    24: "أربعة وعشرون",
    25: "خمسة وعشرون",
    26: "ستة وعشرون",
    27: "سبعة وعشرون",
    28: "ثمانية وعشرون",
    29: "تسعة وعشرون",
    30: "ثلاثون",
    31: "واحد وثلاثون",
  };

  if (num <= 31) {
    return arabicNumbers[num];
  }
  return num.toString();
};

/**
 * Format a date to Gregorian calendar with Arabic text numbers
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted Gregorian date with Arabic text
 */
export const formatDateGregorian = (date) => {
  if (!date) return "";

  try {
    const dateObj = new Date(date);

    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return "تاريخ غير صحيح";
    }

    // Arabic month names
    const arabicMonths = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];

    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    const dayText = numberToArabicText(day);
    const monthName = arabicMonths[month];
    const yearText = year.toString();

    return `${dayText} ${monthName} ${yearText}`;
  } catch (error) {
    console.error("Error formatting Gregorian date:", error);
    return "تاريخ غير صحيح";
  }
};

export default {
  formatDate,
  formatDateShort,
  formatTime,
  getRelativeTime,
  isPastDate,
  isFutureDate,
  getDaysBetween,
  addDays,
  getStartOfDay,
  getEndOfDay,
  isToday,
  isTomorrow,
  isYesterday,
  formatDateGregorian,
};
