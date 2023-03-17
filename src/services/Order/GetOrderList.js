import { privateAxiosInstance } from "../../api/api";

export const GetOrderList = (page) => {
  return privateAxiosInstance.get(`/order/list?page_id=${page}&page_size=6`);
};
