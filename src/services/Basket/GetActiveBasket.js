import { privateAxiosInstance } from "../../api/api";

export const GetActiveBasket = () => {
  return privateAxiosInstance.get("/basket/active");
};
