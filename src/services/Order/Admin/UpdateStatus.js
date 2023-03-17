import { privateAxiosInstance } from "../../../api/api";

export const UpdateStatus = (id, status) => {
  return privateAxiosInstance.put(`/order/admin/update/${id}?status=${status}`);
};
