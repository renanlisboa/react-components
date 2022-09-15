import { useState, forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  InputBaseComponentProps,
} from "@mui/material";
import NumberFormat from "react-number-format";

type InputMask =
  | "currency"
  | "percentage"
  | "phone"
  | "cellphone"
  | "cnpj"
  | "cpf"
  | "cep"
  | undefined;

type InputProps = TextFieldProps & {
  name: string;
  mask?: InputMask;
};

export function Input({
  name,
  value,
  mask,
  variant = "outlined",
  children,
  ...rest
}: InputProps) {
  const { control } = useFormContext();

  const [shrink, setShrink] = useState(false);

  const getInputProps = (mask: InputMask) => {
    switch (mask) {
      case "currency":
        return {
          inputComponent: CurrencyFormatInput,
          startAdornment: (
            <InputAdornment position="start">
              {shrink ? "$" : ""}
            </InputAdornment>
          ),
        };
      case "percentage":
        return {
          inputComponent: PercentageFormatInput,
          endAdornment: (
            <InputAdornment position="end">{shrink ? "%" : ""}</InputAdornment>
          ),
        };
      default:
        return undefined;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          value={value}
          onChange={onChange}
          onFocus={() => setShrink(true)}
          onBlur={() => !value && setShrink(false)}
          variant={variant}
          helperText={error ? error.message : null}
          FormHelperTextProps={{ sx: { ml: 0 } }}
          error={!!error}
          InputLabelProps={{ shrink }}
          InputProps={{ ...getInputProps(mask) }}
          {...rest}
        />
      )}
    />
  );
}

const CurrencyFormatInput = forwardRef(
  (props: InputBaseComponentProps | any, ref) => {
    return (
      <NumberFormat
        {...props}
        getInputRef={ref}
        thousandSeparator={"."}
        decimalSeparator={","}
        decimalScale={2}
        fixedDecimalScale
      />
    );
  }
);

const PercentageFormatInput = forwardRef(
  (props: InputBaseComponentProps | any, ref) => {
    return (
      <NumberFormat
        {...props}
        getInputRef={ref}
        decimalSeparator={"."}
        decimalScale={2}
        fixedDecimalScale
      />
    );
  }
);
