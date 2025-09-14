type Status = "Alive" | "Dead" | "unknown";

interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: "Male" | "Female" | "Genderless" | "unknown";
  origin: {
    name: string;
  };
  location: object;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
