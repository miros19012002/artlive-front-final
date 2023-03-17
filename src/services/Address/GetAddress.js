import { axiosInstance } from "../../api/api";

export const GetAddress = () => {
  return axiosInstance.get("/address/list");
};
