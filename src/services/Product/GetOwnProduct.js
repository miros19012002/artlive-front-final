import { axiosInstance } from "../../api/api";

export const GetOwnProduct = (id) => {
  return axiosInstance.get(`/product/read/${id}`);
};
