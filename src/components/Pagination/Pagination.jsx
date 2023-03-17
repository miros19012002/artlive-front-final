import React from "react";
import { Pagination } from "antd";

const CustomPagination = ({
  page = 1,
  pageSize = 3,
  total = 6,
  setVal,
  style,
}) => {
  return (
    <Pagination
      style={style}
      current={page}
      pageSize={pageSize}
      total={total}
      onChange={(val) => setVal(val)}
      showSizeChanger={false}
    />
  );
};

export default CustomPagination;
