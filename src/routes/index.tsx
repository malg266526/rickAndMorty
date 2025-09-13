import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { Container, Typography, Skeleton } from "@mui/material";
import zod from "zod";
import { Spacing } from "../constants/spacing.ts";
import { CharactersTable } from "../pages/Characters/CharactersTable.tsx";
import { usePaginatedDataRickAndMortyCharacters } from "../pages/Characters/usePaginatedDataRickAndMortyCharacters.ts";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorAlert } from "../components/ErrorAlert.tsx";

const searchParamsSchema = zod.object({
  pageIndex: zod.number().optional(),
  pageSize: zod.number().optional(),
  name: zod.string().optional(),
  status: zod
    .array(
      zod.union([
        zod.literal("Alive"),
        zod.literal("Dead"),
        zod.literal("unknown"),
      ]),
    )
    .optional(),
});

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: searchParamsSchema,
});

const routeApi = getRouteApi("/");

const FIRST_PAGE_INDEX = 1;
const SERVER_PAGE_SIZE = 20;

function Index() {
  const search = routeApi.useSearch();

  const [pagination, setPagination] = useState({
    pageIndex: search.pageIndex || FIRST_PAGE_INDEX,
    pageSize: search.pageSize || SERVER_PAGE_SIZE,
  });

  const charactersResult = usePaginatedDataRickAndMortyCharacters(
    pagination.pageIndex,
    pagination.pageSize,
  );

  const { status, data, error } = charactersResult;

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
        <Typography variant="h2" component="h1">
          Rick & Morty Characters
        </Typography>

        {status === "loading" && (
          <Skeleton variant="rectangular" width={210} height={60} />
        )}

        {status === "success" && (
          <CharactersTable
            characters={data.results}
            pagination={pagination}
            setPagination={setPagination}
          />
        )}
      </Container>
    </ErrorBoundary>
  );
}
