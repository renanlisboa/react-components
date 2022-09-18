import { forwardRef } from "react";
import { IconButton as MuiIconButton, IconButtonProps } from "@mui/material";

export const IconButton = forwardRef(
  ({ children, ...props }: IconButtonProps, ref) => {
    return (
      <MuiIconButton ref={ref as any} {...props}>
        {children}
      </MuiIconButton>
    );
  }
);
