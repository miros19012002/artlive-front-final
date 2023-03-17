import { privateAxiosInstance } from "../../../api/api";

export const GetAllOrders = () => {
  return privateAxiosInstance.get("/order/admin/all");
};
