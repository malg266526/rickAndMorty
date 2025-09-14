import { useQuery } from "@tanstack/react-query";

type FetchCharacter = (url: string) => Promise<Character>;

const fetchCharacter: FetchCharacter = (url) =>
  fetch(url).then((response) => {
    if (response.status === 200) {
      return response.json();
    }

    throw new Error(`Could not fetch character - status ${response.status}`);
  });

export const useCharacterById = (id: string) => {
  return useQuery({
    queryKey: ["character", id],
    retry: 1,
    queryFn: () =>
      fetchCharacter(`https://rickandmortyapi.com/api/character/${id}`),
  });
};
