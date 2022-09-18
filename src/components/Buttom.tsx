import { forwardRef } from "react";
import { Button as MuiButton, ButtonProps } from "@mui/material";

export const Button = forwardRef(
  (
    { variant = "contained", size = "large", children, ...rest }: ButtonProps,
    ref
  ) => {
    return (
      <MuiButton ref={ref as any} variant={variant} size={size} {...rest}>
        {children}
      </MuiButton>
    );
  }
);
