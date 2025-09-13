import { createFileRoute } from "@tanstack/react-router";
import { Container, Typography } from "@mui/material";
import zod from "zod";
import { Spacing } from "../constants/spacing.ts";
import { CharactersTable } from "../components/characters/CharactersTable.tsx";

const searchParamsSchema = zod.object({
  pageIndex: zod.number().optional(),
  pageSize: zod.number().optional(),
});

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: searchParamsSchema,
});

function Index() {
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
      <Typography variant="h2" component="h1">
        Rick & Morty Characters
      </Typography>

      {/*{status === "pending" && (*/}
      {/*  <Skeleton variant="rectangular" width={210} height={60} />*/}
      {/*)}*/}

      <CharactersTable />
    </Container>
  );
}
