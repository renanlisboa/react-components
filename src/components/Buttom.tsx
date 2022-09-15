import { Button as MuiButton, ButtonProps } from "@mui/material";

export const Button = ({
  variant,
  color,
  size,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <MuiButton
      variant={variant ?? "contained"}
      color={color ?? "primary"}
      size={size ?? "large"}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};
