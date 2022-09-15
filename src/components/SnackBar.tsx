import {
  Snackbar as MuiSnackbar,
  SnackbarProps as MuiSnackbarProps,
  Alert,
  AlertProps,
} from "@mui/material";

import { useSnackbarContext } from "../contexts";

type SnackBarProps = MuiSnackbarProps & AlertProps;

export function Snackbar({
  variant = "filled",
  autoHideDuration,
  ...rest
}: SnackBarProps) {
  const { snackbarSeverity, snackbarMessage, snackbarOpen, snackbarClose } =
    useSnackbarContext();

  return (
    <MuiSnackbar
      open={snackbarOpen}
      onClose={(_, reason) => reason !== "clickaway" && snackbarClose()}
      autoHideDuration={autoHideDuration ?? 3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      {...rest}
    >
      <Alert
        variant={variant}
        severity={snackbarSeverity}
        elevation={6}
        onClose={snackbarClose}
        {...rest}
      >
        {snackbarMessage}
      </Alert>
    </MuiSnackbar>
  );
}
