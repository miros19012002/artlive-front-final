import { privateAxiosInstance } from "../../api/api";

export const CreateBasket = () => {
  return privateAxiosInstance.get("/basket/create");
};
