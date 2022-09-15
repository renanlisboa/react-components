import { Button as MuiButton, ButtonProps, styled } from "@mui/material";

export function Button({ variant, color, size, children, ...rest }: ButtonProps) {

  const StyledButton = styled(MuiButton)({
    textTransform: 'none',
    borderRadius: 0,
  })

  return (
    <StyledButton
      variant={variant ?? 'contained'}
      color={color ?? 'primary'}
      size={size ?? 'large'}
      {...rest}
    >
      {children}
    </StyledButton>
  )
}