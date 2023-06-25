// src/form-component/FormInputText.tsx
import { Controller } from "react-hook-form";
import { BasicTextInput } from "../BasicTextInput";
// import { FormInputProps } from "./FormInputProps";
const FormTextInput = (props) => {
  const { name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error }, formState }) => (
        <BasicTextInput {...props} {...field} />
      )}
    />
  );
};

export default FormTextInput;
