import { useState } from "react";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const BasicDropdown = (props) => {
  const {
    id,
    name,
    options,
    error = false,
    errorMessage = "",
    required = false,
  } = props;
  const [value, setValue] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  const label = `${name} ${required ? "*" : ""}`;
  return (
    <FormControl fullWidth error={error}>
      <InputLabel id={`${id}Label`}>{label}</InputLabel>
      <Select
        labelId={`${id}Label`}
        id={id}
        value={value}
        label={label}
        onChange={handleChange}
        renderValue={(value) => `⚠️  - ${value}`}
      >
        {options?.map((option) => (
          <MenuItem value={option.value} sx={{ textTransform: "capitalize" }}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default BasicDropdown;
