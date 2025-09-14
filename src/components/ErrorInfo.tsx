import { Card, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { Spacing } from "../constants/spacing.ts";

interface ErrorInfoProps {
  message: string;
  children?: ReactNode;
}

export const ErrorInfo = ({ message, children }: ErrorInfoProps) => {
  console.error("message", message);

  return (
    <Card
      sx={{
        padding: Spacing.md,
        width: "30%",
      }}
    >
      <Stack spacing={Spacing.md} alignItems="center">
        <Typography variant="body1" color="red">
          Error occured!
        </Typography>
        {children}
      </Stack>
    </Card>
  );
};
