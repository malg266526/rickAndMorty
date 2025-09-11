import { useState } from "react";

export const usePagination = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 20, //default page size
  });

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

  return { pagination, setPagination, setPreviousPage, setNextPage };
};
