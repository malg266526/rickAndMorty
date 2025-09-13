import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

interface ErrorAlertProps {
  error: Error;
}

export const ErrorAlert = ({ error }: ErrorAlertProps) => {
  const [isOpen, setIsOpen] = useState(!!error.message);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={() => setIsOpen(false)}
    >
      <Alert severity="error" sx={{ m: 2 }}>
        Something went wrong: {error.message}
      </Alert>
    </Snackbar>
  );
};
