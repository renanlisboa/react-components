import { CircularProgress, CircularProgressProps } from "@mui/material";

export function Loading({ size, ...rest }: CircularProgressProps) {
  return <CircularProgress size={size ?? 32} {...rest} />;
}
