import { axiosInstance } from "../../api/api";

export const GetCountryList = () => {
  return axiosInstance.get("/product/country");
};
