import { Tooltip as MuiTooltip, TooltipProps, Zoom } from "@mui/material";

export function Tooltip({
  placement = "bottom",
  children,
  ...rest
}: TooltipProps) {
  return (
    <MuiTooltip
      arrow
      placement={placement}
      TransitionComponent={Zoom}
      {...rest}
    >
      {children}
    </MuiTooltip>
  );
}
