import { ReactNode } from "react";
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardHeader,
  CardContent,
} from "@mui/material";

type CardProps = MuiCardProps & {
  title?: string;
  headerAction?: ReactNode;
  bgColor?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
};

export function Card({
  title,
  headerAction,
  bgColor,
  children,
  ...rest
}: CardProps) {
  return (
    <MuiCard
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: (theme) => bgColor && theme.palette[bgColor].main,
        color: (theme) => bgColor && theme.palette[bgColor].contrastText,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
      {...rest}
    >
      <CardHeader title={title} action={headerAction} />
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
}
