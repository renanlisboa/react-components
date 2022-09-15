import { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';

type FormProps = {
  children: ReactNode;
  validationSchema: ObjectSchema<any>;
  onSubmit: (data: any) => void;
};

export function Form({ validationSchema, onSubmit, children }: FormProps) {
  const useFormMethods = useForm({ resolver: yupResolver(validationSchema) })
  const { handleSubmit } = useFormMethods;

  return (
    <FormProvider {...useFormMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
