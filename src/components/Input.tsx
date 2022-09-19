import { ChangeEvent, useState, forwardRef } from "react";
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  InputBaseComponentProps,
} from "@mui/material";
import NumberFormat from "react-number-format";
import { Controller, useFormContext } from "react-hook-form";

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

  const convertCurrencyToNumberString = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (mask != "currency") return event;
    const floatValue = event.target.value.replaceAll(",", "");
    event.target.value = floatValue;
    return event;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          value={value}
          onChange={(event) => onChange(convertCurrencyToNumberString(event))}
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

const formatCurrency = (value: string) => {
  const currency = value
    .replace(/(\d)(\d{2})$/, "$1.$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ",");
  return currency;
};

const formatPercentage = (value: string) => {
  const percentage = value.replace(/(\d)(\d{2})$/, "$1.$2");
  return percentage;
};

const CurrencyFormatInput = forwardRef(
  (props: InputBaseComponentProps | any, ref) => {
    return (
      <NumberFormat {...props} getInputRef={ref} format={formatCurrency} />
    );
  }
);

const PercentageFormatInput = forwardRef(
  (props: InputBaseComponentProps | any, ref) => {
    return (
      <NumberFormat {...props} getInputRef={ref} format={formatPercentage} />
    );
  }
);
