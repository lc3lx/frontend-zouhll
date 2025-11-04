import baseUrl from "../Api/baseURL";

const useInsertDataWithImage = async (url, parmas) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    const res = await baseUrl.post(url, parmas, config);
    return res;
  } catch (error) {
    // Re-throw error with response data for better error handling
    throw error;
  }
};

const useInsertData = async (url, parmas) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await baseUrl.post(url, parmas, config);

  return res;
};

export { useInsertData, useInsertDataWithImage };
