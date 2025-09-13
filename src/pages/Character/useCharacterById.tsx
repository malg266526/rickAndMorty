import { useQuery } from "@tanstack/react-query";

type FetchCharacter = (url: string) => Promise<Character>;

const fetchCharacter: FetchCharacter = (url) =>
  fetch(url).then((response) => response.json());

export const useCharacterById = (id: string) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () =>
      fetchCharacter(`https://rickandmortyapi.com/api/character/${id}`),
  });
};
