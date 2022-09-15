import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  SelectProps as MuiSelectProps,
  FormHelperText,
} from "@mui/material";

type SelectProps = MuiSelectProps & {
  name: string;
  options: string[];
};

export function Select({
  name,
  label,
  variant = "outlined",
  defaultValue,
  options,
  children,
  ...rest
}: SelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth style={{ marginTop: error ? 0 : 4 }}>
          <InputLabel
            id="select-label"
            htmlFor={name}
            error={!!error}
          >
            {label}
          </InputLabel>
          <MuiSelect
            error={!!error}
            label={label}
            labelId="select-label"
            variant={variant}
            {...field}
            {...rest}
          >
            <MenuItem value="">
              <em>Remove Selection</em>
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </MuiSelect>
          <FormHelperText sx={{ ml: 0 }} error={!!error}>
            {error ? error.message : ""}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}
