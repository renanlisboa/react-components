import { useState } from 'react'
import { Box, IconButton, useTheme } from "@mui/material"
import { Add, Remove } from '@mui/icons-material';
import { Text, Tooltip } from '.';

type InputSpinnerProps = {
  color?: "inherit" |
  "primary" |
  "secondary" |
  "default" |
  "error" |
  "info" |
  "success" |
  "warning";
  onChange: (value: number) => void;
  value: number;
}

export function InputSpinner({ onChange, value = 1, color }: InputSpinnerProps) {
  const { palette } = useTheme()
  const [inputValue, setInputValue] = useState(value)

  const handleIncreaseValue = () => {
    setInputValue(prevState => prevState + 1)
    onChange(inputValue + 1);
  }

  const handleDecreaseValue = () => {
    if (inputValue === 1) return
    setInputValue(prevState => prevState - 1)
    onChange(inputValue - 1);
  }

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
      <Tooltip title="Remover">
      <IconButton
        color={color ?? 'primary'}
        onClick={handleDecreaseValue}
      >
        <Remove titleAccess="Remove" fontSize="small" />
      </IconButton>
      </Tooltip>
      <Text
        variant="body2"
        textAlign="center"
        width={24}
      >
        {inputValue}
      </Text>
      <Tooltip title="Adicionar">
        <IconButton
          color={color ?? 'primary'}
          onClick={handleIncreaseValue}
        >
          <Add titleAccess="Add" fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  )
}