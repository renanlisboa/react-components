import { forwardRef } from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

export type ButtonProps = MuiButtonProps & {
  label: string;
};

export const Button = forwardRef(
  (
    { variant = "contained", size = "large", label, ...rest }: ButtonProps,
    ref
  ) => {
    return (
      <MuiButton ref={ref as any} variant={variant} size={size} {...rest}>
        {label}
      </MuiButton>
    );
  }
);
