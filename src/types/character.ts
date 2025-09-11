export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Male" | "Female" | "Genderless" | "unknown";
  origin: object;
  location: object;
  image: string;
  episodes: string[];
  url: string;
  created: string;
}
