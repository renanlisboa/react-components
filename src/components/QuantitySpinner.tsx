import { useState } from "react";
import { useTheme } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

import { Box, Tooltip, IconButton, Text } from ".";

type QuantitySpinnerProps = {
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "default"
    | "error"
    | "info"
    | "success"
    | "warning";
  onChange: (value: number) => void;
  value: number;
};

export function QuantitySpinner({
  onChange,
  value = 1,
  color,
}: QuantitySpinnerProps) {
  const { palette } = useTheme();
  const [quantity, setQuantity] = useState(value);

  const handleIncreaseQuantity = () => {
    setQuantity((prevState) => prevState + 1);
    onChange(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prevState) => prevState - 1);
    onChange(quantity - 1);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      border={`1px solid ${palette.border}`}
      borderRadius={1}
      width={140}
      gap={2}
    >
      <Tooltip title="Remove" arrow>
        <IconButton color={color ?? "primary"} onClick={handleDecreaseQuantity}>
          <Remove titleAccess="Remove" fontSize="small" />
        </IconButton>
      </Tooltip>
      <Text variant="body2" textAlign="center" width={24}>
        {quantity}
      </Text>
      <Tooltip title="Add" arrow>
        <IconButton color={color ?? "primary"} onClick={handleIncreaseQuantity}>
          <Add titleAccess="Add" fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
