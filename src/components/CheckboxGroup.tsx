import { useEffect, useState } from "react";
import {
  Stack,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { CardProduto } from ".";

type CheckBoxGroupProps = {
  name: string;
  label: string;
  options: Option[];
};

type Option = {
  id: number | string;
  label: string;
  price?: string;
  promoPrice?: string;
  image?: string;
};

export const CheckboxGroup = ({
  name,
  label,
  options,
}: CheckBoxGroupProps) => {
  const {
    control,
    setValue,
    resetField,
    formState: { errors },
  } = useFormContext();
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const error = errors[name];
  const errorMessage: any = error?.message ?? "";

  useEffect(() => {
    setValue(name, selectedItems);
  }, [selectedItems]);

  const handleSelect = (value: Option) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };

  return (
    <FormControl error={!!error}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup sx={{ mt: 2 }}>
        <Stack direction="row" gap={6} flexWrap="wrap">
          {options.map((option: Option) => {
            return (
              <FormControlLabel
                key={option.id}
                label={option.label}
                control={
                  <Controller
                    name={name}
                    control={control}
                    render={() => {
                      return (
                        <Checkbox
                          sx={{ mr: 1 }}
                          checked={selectedItems.includes(option)}
                          onChange={() => {
                            handleSelect(option);
                            resetField(name);
                          }}
                        />
                      );
                    }}
                  />
                }
              />
            );
          })}
        </Stack>
      </FormGroup>
      <FormHelperText sx={{ ml: 0, mt: 2 }}>{errorMessage}</FormHelperText>
    </FormControl>
  );
};
