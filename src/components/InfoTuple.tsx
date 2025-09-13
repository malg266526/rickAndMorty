import { Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface InfoTupleProps {
  title: string;
  children: ReactNode;
}

export const InfoTuple = ({ title, children }: InfoTupleProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        borderBottom: "1px solid",
        borderColor: "secondary.main",
        padding: 1,
      }}
    >
      <Typography variant="h6">{title}:</Typography>
      <Typography variant="body1">{children}</Typography>
    </Stack>
  );
};
