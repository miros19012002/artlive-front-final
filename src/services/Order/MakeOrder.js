import { privateAxiosInstance } from "../../api/api";

export const MakeOrder = (data) => {
  return privateAxiosInstance.post("/order/create", data);
};
