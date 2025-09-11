import { useQuery } from "@tanstack/react-query";
import type { Character } from "../types/character.ts";
import type { Pagination } from "../types/pagination.ts";

const RickAndMortyApi = "https://rickandmortyapi.com/api";
const CharactersUrlApi = `${RickAndMortyApi}/character`;

export interface CharactersResponse {
  info: Pagination;
  results: Character[];
}

type FetchCharacters = (url: string) => Promise<CharactersResponse>;
const fetchCharacters: FetchCharacters = (url) =>
  fetch(url).then((response) => response.json());

export const useCharacters = (pageIndex: number) => {
  const url = `${CharactersUrlApi}/?page=${pageIndex}`;

  console.log("url", url);

  const result = useQuery({
    queryKey: ["characters", pageIndex],
    queryFn: () => fetchCharacters(url),
  });

  console.log("result", result);

  return result;
};
