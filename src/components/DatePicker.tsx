import {
  LocalizationProvider,
  DatePicker as MuiXDatePicker,
} from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enUS } from "date-fns/locale";

type DatePickerProps = {
  name: string;
  label: string;
  format?: string;
  variant?: "standard" | "filled" | "outlined";
  disabled?: boolean;
};

export function DatePicker({
  name,
  variant = "outlined",
  ...rest
}: DatePickerProps) {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <MuiXDatePicker
            onChange={onChange}
            value={value}
            renderInput={(params) => (
              <TextField
                {...params}
                helperText={error ? error.message : null}
                FormHelperTextProps={{ sx: { ml: 0 } }}
                error={!!error}
                variant={variant}
              />
            )}
            {...rest}
          />
        )}
      />
    </LocalizationProvider>
  );
}
