import { CardActions as MuiCardActions, CardActionsProps } from "@mui/material";

export function CardActions(props: CardActionsProps) {
  return <MuiCardActions sx={{ px: 0 }} {...props} />;
}
