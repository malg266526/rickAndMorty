import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@mui/material";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Container maxWidth={false}>
      <h3>Welcome Home!</h3>
    </Container>
  );
}
