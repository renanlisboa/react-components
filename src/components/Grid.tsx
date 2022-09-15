import { Grid as MuiGrid, GridProps } from "@mui/material";

export function Grid({ spacing = 4, ...rest }: GridProps) {
  return <MuiGrid container spacing={spacing} {...rest} />;
}
