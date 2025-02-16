import axios from "axios";

const useCategory = async () => {
  try {
    const { data } = await axios.get("/api/v1/category/get-all-categories");
    if (data?.success) return data.category;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default useCategory;
