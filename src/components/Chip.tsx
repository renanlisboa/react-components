import { Chip as MuiChip, ChipProps } from "@mui/material";

export function Chip(props: ChipProps) {
  return <MuiChip sx={{ padding: 1 }} {...props} />;
}
