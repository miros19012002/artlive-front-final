import { axiosInstance } from "../../api/api";

export const GetMainCategories = () => {
  return axiosInstance.get("/category/mainlist");
};
