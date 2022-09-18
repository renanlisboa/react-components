import { Typography, TypographyProps } from "@mui/material";

type TextProps = TypographyProps & {
  variant?:
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline";
};

export function Text({ children, ...rest }: TextProps) {
  return <Typography {...rest}>{children}</Typography>;
}
