import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function DatePickerInput({ children }) {
  return (
    <>
      <h1>Date Picker Input</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
      </LocalizationProvider>
      
    </>
  );
}

export default DatePickerInput;
