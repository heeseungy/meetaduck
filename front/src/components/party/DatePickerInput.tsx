import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs, { Dayjs } from 'dayjs';

import { partyState } from '@/recoil/atom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';


function DatePickerInput({ setEndDate }) {
  const datePickerFormat = 'YYYY-MM-DD';

  // 오늘 날짜
  const today = dayjs();

  // 선택 가능한 최소 날짜 계산 (오늘로부터 3일 후)
  const minDate = today.add(3, 'day');

  // 선택 가능한 최대 날짜 계산 (오늘로부터 7일 후)
  const maxDate = today.add(7, 'day');

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="종료 날짜를 선택해주세요"
          slotProps={{
            textField: {
              size: 'small',
            },
          }}
          format="YYYY / MM / DD"
          onChange={(newValue) => {
            setEndDate(newValue);
          }}
          // value={endDate}
          // onChange={(newValue) => {
          //   endDateChange(newValue);
          // }}
          // shouldDisableDate={(day) => {
          //   const selectedDay = dayjs(day as Dayjs);

          //   // 최소 날짜 이전이거나 최대 날짜 이후인 경우 비활성화
          //   return selectedDay.isBefore(minDate, 'day') || selectedDay.isAfter(maxDate, 'day');
          // }}
        />
      </LocalizationProvider>
    </>
  );
}

export default DatePickerInput;
