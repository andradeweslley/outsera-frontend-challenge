import React from "react";
import { Alert, Box, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  severity?: "error" | "warning" | "info";
}

/**
 * Reusable error message component
 * @param message - Error message to display
 * @param onRetry - Optional retry function
 * @param severity - Alert severity (default: "error")
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  severity = "error",
}) => {
  return (
    <Box p={2}>
      <Alert
        severity={severity}
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              onClick={onRetry}
              startIcon={<RefreshIcon />}
            >
              Retry
            </Button>
          )
        }
      >
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
