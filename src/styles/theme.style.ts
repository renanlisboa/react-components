import { PaletteMode, ThemeOptions } from "@mui/material";

export const getCustomTheme = (mode: PaletteMode): ThemeOptions => ({
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
  palette: {
    mode,
    ...(mode == "light"
      ? {
          border: "#CFCFCF",
        }
      : {
          border: "#404040",
        }),
  },
});
