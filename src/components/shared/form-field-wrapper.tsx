import type { ReactNode } from "react";

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type FormFieldWrapperProps = {
  label: string;
  description?: string;
  children: ReactNode;
};

export function FormFieldWrapper({ label, description, children }: FormFieldWrapperProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      {description ? <FormDescription>{description}</FormDescription> : null}
      <FormMessage />
    </FormItem>
  );
}
