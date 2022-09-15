import { Typography, TypographyProps } from "@mui/material";

type HeadingProps = TypographyProps & {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function Heading({ children, ...rest }: HeadingProps) {
  return (
    <Typography {...rest}>
      {children}
    </Typography>
  )
}