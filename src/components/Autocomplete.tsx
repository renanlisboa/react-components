import { Controller, useFormContext } from "react-hook-form";
import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material";

type AutocompleteProps = MuiAutocompleteProps<
  string | any,
  true,
  true,
  false
> & {
  name: string;
  multiple?: boolean;
};

export function Autocomplete({
  name,
  multiple,
  options,
  getOptionLabel,
  renderInput,
  ...rest
}: AutocompleteProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <MuiAutocomplete
          multiple={multiple}
          options={options}
          renderInput={renderInput}
          getOptionLabel={getOptionLabel}
          onChange={(_, data) => {
            onChange(data);
            return data;
          }}
          defaultValue={multiple ? [] : undefined}
          clearText="Remove Selection"
          closeText="Close"
          openText="Open"
          noOptionsText="Not found"
          {...rest}
        />
      )}
    />
  );
}
