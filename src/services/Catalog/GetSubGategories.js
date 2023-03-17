import { axiosInstance } from "../../api/api";

export const GetSubCategories = (category) => {
  return axiosInstance.get(`/category/sublist?main_cat_id=${category}`);
};
