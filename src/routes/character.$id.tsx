import { createFileRoute } from "@tanstack/react-router";
import { useCharacterById } from "../pages/Character/useCharacterById.tsx";
import { Spacing } from "../constants/spacing.ts";
import {
  CardMedia,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { KeyValueInfo } from "../components/KeyValueInfo.tsx";

export const Route = createFileRoute("/character/$id")({
  component: CharacterId,
});

function CharacterId() {
  const { id } = Route.useParams();

  console.log("params", id);

  const characterData = useCharacterById(id);
  const { status, data } = characterData;
  const {
    name,
    gender,
    status: characterStatus,
    species,
    origin,
    episode,
    image,
  } = data || {};

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        padding: Spacing.lg,
        gap: Spacing.md,
        flexDirection: "column",
      }}
    >
      {status === "pending" && (
        <Skeleton variant="rectangular" width={210} height={60} />
      )}

      {status === "success" && data && (
        <>
          <Typography variant="h2" component="h1">
            Hello {name} !
          </Typography>
          <Stack direction="row" spacing={Spacing.md}>
            <Paper sx={{ padding: Spacing.md, width: "50%" }}>
              <KeyValueInfo title="Gender">{gender}</KeyValueInfo>
              <KeyValueInfo title="Status">{characterStatus}</KeyValueInfo>
              <KeyValueInfo title="Species">{species}</KeyValueInfo>
              <KeyValueInfo title="Origin">{origin.name}</KeyValueInfo>
              <KeyValueInfo title="Played in">
                {episode.length} episodes
              </KeyValueInfo>
            </Paper>

            <Paper sx={{ padding: Spacing.md, width: "30%" }}>
              <CardMedia
                component="img"
                height="400"
                image={image}
                alt={name}
              />
            </Paper>
          </Stack>
        </>
      )}
    </Container>
  );
}
