import { axiosInstance } from "../../api/api";

export const GetListProduct = (category = 1, page = 1, size = 6, params) => {
  let query = "";

  if (params) {
    const queryArr = [];

    Object.keys(params).forEach((key) => {
      if (params[key]) queryArr.push(`${key}=${params[key]}`);
    });

    query = queryArr.join("&");
  }

  return axiosInstance.get(
    `/product/list?page_id=${page}&page_size=${size}&category_id=${category}&${query}`
  );
};
