import { useState } from "react";

export type Pagination = {
  pageIndex: number; //initial page index
  pageSize: number;
};

export const usePagination = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 1, //initial page index
    pageSize: 20, //default page size
  });

  console.log("pagination", pagination.pageSize);

  const setPreviousPage = () => {
    setPagination({
      ...pagination,
      pageIndex: pagination.pageIndex - 1,
    });
  };

  const setNextPage = () => {
    setPagination({
      ...pagination,
      pageIndex: pagination.pageIndex + 1,
    });
  };

  const setPageSize = (pageSize: number) => {
    setPagination({ ...pagination, pageSize });
  };

  return {
    pagination,
    setPagination,
    setPreviousPage,
    setNextPage,
    setPageSize,
  };
};
