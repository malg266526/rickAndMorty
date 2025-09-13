import { useState } from "react";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { Route } from "../routes";

export type Pagination = {
  pageIndex: number;
  pageSize: number;
};

const routeApi = getRouteApi("/");

const FIRST_PAGE_INDEX = 1;
const SERVER_PAGE_SIZE = 20;

export const usePagination = () => {
  const search = routeApi.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const [pagination, setPagination] = useState({
    pageIndex: search.pageIndex || FIRST_PAGE_INDEX,
    pageSize: search.pageSize || SERVER_PAGE_SIZE,
  });

  // Todo: filters also needs to be udpaed in url

  const setPage = (newPageIndex: number, newPageSize: number) => {
    setPagination({
      pageIndex: newPageIndex,
      pageSize: newPageSize,
    });

    void navigate({
      search: {
        pageIndex: newPageIndex,
        pageSize: newPageSize,
      },
    });
  };

  const setPreviousPage = () => {
    const newPageIndex = pagination.pageIndex - 1;
    const newPageSize = pagination.pageSize;

    setPage(newPageIndex, newPageSize);
  };

  const setNextPage = () => {
    const newPageIndex = pagination.pageIndex + 1;
    const newPageSize = pagination.pageSize;

    setPage(newPageIndex, newPageSize);
  };

  const setPageSize = (pageSize: number) => {
    // reset pageIndex to first page when changing pageSize
    setPage(FIRST_PAGE_INDEX, pageSize);
  };

  return {
    pagination,
    setPagination,
    setPreviousPage,
    setNextPage,
    setPageSize,
  };
};
