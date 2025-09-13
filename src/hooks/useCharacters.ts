import { useQueries, useQuery } from "@tanstack/react-query";
import { findPagesToFetch } from "../utils/findPagesToFetch.ts";
import { getSlicingBoundaries } from "../utils/getSlicingBoundaries.ts";

const RickAndMortyApi = "https://rickandmortyapi.com/api";
const CharactersUrlApi = `${RickAndMortyApi}/character`;

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Character[];
}

const SERVER_PAGE_SIZE = 20;

type UseQueryResult = ReturnType<typeof useQuery<CharactersResponse>>;

type FetchCharacters = (url: string) => Promise<CharactersResponse>;
const fetchCharacters: FetchCharacters = (url) =>
  fetch(url).then((response) => response.json());
// usePaginatedDataRickAndMortyCharacters
// param: (page: number) => fetchCharacters()
// usePagination
export const useCharacters = (pageIndex: number, pageSize: number) => {
  const allPagesToFetch = findPagesToFetch(
    pageIndex,
    pageSize,
    SERVER_PAGE_SIZE,
  );

  const responses: UseQueryResult[] = useQueries({
    queries: allPagesToFetch.map((page) => ({
      queryKey: ["characters", page],
      queryFn: () => fetchCharacters(`${CharactersUrlApi}/?page=${page}`),
    })),
  });

  const mergedResults = responses
    .map((response) => response?.data?.results ?? [])
    .flat();

  // Todo handle errors
  const mergedErrors = responses
    .filter((response) => response.isError)
    .map((response) => response.error);

  // Todo: handle
  const isLoading = responses.some((response) => response.isLoading);

  const { top, end } = getSlicingBoundaries(
    allPagesToFetch[allPagesToFetch.length - 1],
    SERVER_PAGE_SIZE,
    pageIndex,
    pageSize,
  );

  const infoResponseData = responses[0].data;
  const paginatedResult = {
    results: mergedResults.slice(top, end),
    info: {
      pages: infoResponseData
        ? Math.ceil(infoResponseData.info.count / pageSize)
        : 0,
      count: infoResponseData?.info.count || 0,
    },
  };

  // status: loading | error | success
  return { data: paginatedResult, isLoading, error: mergedErrors };
};
