import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
} from "@mui/material";

type SwitchProps = MuiSwitchProps & {
  controlled?: boolean;
  name?: string;
  label: string;
};

export function Switch({
  controlled = false,
  name = "",
  label,
  ...rest
}: SwitchProps) {
  if (controlled) {
    return (
      <FormControlLabel
        label={label}
        control={
          <MuiSwitch 
            inputProps={{ "aria-label": "Switch" }} 
            {...rest} 
          />
        }
      />
    );
  } else {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    const error = errors[name];
    const errorMessage: any = error?.message ?? "";

    return (
      <FormControl error={!!error}>
        <FormControlLabel
          label={label}
          control={
            <Controller
              name={name}
              control={control}
              defaultValue={false}
              render={({ field: { onChange, value } }) => {
                return (
                  <MuiSwitch
                    inputProps={{ "aria-label": "Switch" }}
                    checked={value}
                    onChange={onChange}
                    {...rest}
                  />
                );
              }}
            />
          }
        />
        <FormHelperText sx={{ ml: 0 }}>{errorMessage}</FormHelperText>
      </FormControl>
    );
  }
}
