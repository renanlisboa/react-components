import { PaletteOptions } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  export interface PaletteOptions {
    border: string,
  }
  export interface Palette {
    border: string,
  }
}
