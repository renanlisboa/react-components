import { IconButton as MuiIconButton, IconButtonProps } from "@mui/material";

export const IconButton = ({ children, ...props }: IconButtonProps) => {
  return <MuiIconButton {...props}>{children}</MuiIconButton>;
};
