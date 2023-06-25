import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const BasicDatePicker = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker slotProps={{ textField: { fullWidth: true } }} />
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
