import { ReactNode, useState, createContext, useContext } from "react";

type SnackbarProviderProps = {
  children: ReactNode;
};

type SnackbarNotifyProps = {
  message: string;
  severity: Severity;
};

type SnackbarContextDataTypes = {
  snackbarSeverity: Severity;
  snackbarMessage: string;
  snackbarOpen: boolean;
  snackbarClose: () => void;
  snackbarNotify: (snackbarNotifyProps: SnackbarNotifyProps) => void;
};

type Severity = "success" | "error" | "warning" | "info";

const SnackbarContext = createContext({} as SnackbarContextDataTypes);

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const snackbarClose = () => {
    setSnackbarOpen(false);
  };

  const snackbarNotify = ({ message, severity }: SnackbarNotifyProps) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <SnackbarContext.Provider
      value={{
        snackbarSeverity,
        snackbarMessage,
        snackbarOpen,
        snackbarClose,
        snackbarNotify,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
}

export const useSnackbarContext = () => useContext(SnackbarContext);
