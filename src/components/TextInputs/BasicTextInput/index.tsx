import React, { useState, ChangeEvent } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
interface TextInputProps {
  onSubmit?: (value: string) => void;
}

export const BasicTextInput: React.FC<TextInputProps> = (props) => {
  const {
    name,
    iconStart,
    iconEnd,
    InputProps,
    type = "text",
    validation = {},
    register = () => {},
    // defaultValue = "",
  } = props;
  // const [inputValue, setInputValue] = useState(defaultValue);

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };

  return (
    <TextField
      // onChange={handleInputChange}
      type={type}
      // defaultValue={inputValue}
      InputProps={{
        ...InputProps,
        startAdornment: iconStart ? (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null,
      }}
      {...register(name, validation)}
      {...props}
    />
  );
};
