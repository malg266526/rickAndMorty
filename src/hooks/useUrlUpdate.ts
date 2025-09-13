import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { Route } from "../routes";

const routeApi = getRouteApi("/");

export const useUrlUpdate = () => {
  const search = routeApi.useSearch();

  const navigate = useNavigate({ from: Route.fullPath });

  const updateUrl = (params: Record<string, Status[] | number | string>) => {
    void navigate({
      search: {
        ...search,
        ...params,
      },
    });
  };

  const clearFilters = () => {
    void navigate({
      search: {
        pageIndex: search.pageIndex,
        pageSize: search.pageSize,
      },
    });
  };

  return { updateUrl, clearFilters };
};
