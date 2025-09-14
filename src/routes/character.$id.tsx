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
import { InfoTuple } from "../components/InfoTuple.tsx";
import { ErrorAlert } from "../components/ErrorAlert.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorInfo } from "../components/ErrorInfo.tsx";
import { RefetchButton } from "../components/RefetchButton.tsx";

export const Route = createFileRoute("/character/$id")({
  component: CharacterId,
});

function CharacterId() {
  const { id } = Route.useParams();

  const characterData = useCharacterById(id);

  const {
    name,
    gender,
    status: characterStatus,
    species,
    origin,
    episode,
    image,
  } = characterData?.data || {};

  return (
    <ErrorBoundary FallbackComponent={ErrorAlert}>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          padding: Spacing.lg,
          gap: Spacing.md,
          flexDirection: "column",
        }}
      >
        {characterData.status === "pending" && (
          <Skeleton variant="rectangular" width={210} height={60} />
        )}

        {characterData.status === "error" && (
          <ErrorInfo message={characterData?.error.message}>
            <RefetchButton refetch={characterData.refetch} />
          </ErrorInfo>
        )}

        {characterData.status === "success" && (
          <>
            <Typography variant="h2" component="h1">
              Hello {name} !
            </Typography>
            <Stack direction="row" spacing={Spacing.md}>
              <Paper sx={{ padding: Spacing.md, width: "50%" }}>
                <InfoTuple title="Gender">{gender}</InfoTuple>
                <InfoTuple title="Status">{characterStatus}</InfoTuple>
                <InfoTuple title="Species">{species}</InfoTuple>
                <InfoTuple title="Origin">{origin?.name}</InfoTuple>
                <InfoTuple title="Played in">
                  {episode?.length} episodes
                </InfoTuple>
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
    </ErrorBoundary>
  );
}
