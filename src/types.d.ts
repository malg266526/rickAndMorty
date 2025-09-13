type Status = "Alive" | "Dead" | "unknown";

interface Character {
  id: number;
  name: string;
  status: Status;
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
