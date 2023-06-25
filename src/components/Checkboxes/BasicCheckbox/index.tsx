import { Checkbox, FormControlLabel } from "@mui/material";

const BasicCheckbox = (props) => {
  const { label } = props;
  return (
    <div className="flex items-center gap-2">
      <FormControlLabel
        control={<Checkbox {...props} />}
        label={label}
        className="capitalize"
      />
    </div>
  );
};

export default BasicCheckbox;
