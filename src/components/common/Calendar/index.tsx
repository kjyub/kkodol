import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import 'react-calendar/dist/Calendar.css';
import './style.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CustomCalendarProps {
  selectionMode?: 'single' | 'range';
  value?: string | null; // For 'single' mode: 'YYYY-MM-DD'
  dateStart?: string | null; // For 'range' mode
  dateEnd?: string | null; // For 'range' mode
  onDateClick?: (date: string) => void;

  // 현재 보여주는 달을 제어하기 위한 props
  activeStartDate: string; // 'YYYY-MM-DD' 형식

  maxDetail?: 'month' | 'year' | 'decade' | 'century';
  minDetail?: 'month' | 'year' | 'decade' | 'century';
}

const CustomCalendar = ({
  selectionMode = 'range',
  value: singleValue,
  dateStart,
  dateEnd,
  onDateClick,
  activeStartDate,
  maxDetail,
  minDetail,
}: CustomCalendarProps) => {
  const calendarValue: Value = (() => {
    if (selectionMode === 'single') {
      return singleValue ? dayjs(singleValue).toDate() : null;
    }

    const start = dateStart ? dayjs(dateStart).toDate() : null;
    const end = dateEnd ? dayjs(dateEnd).toDate() : null;

    if (start && end) {
      return [start, end].sort((a, b) => a.getTime() - b.getTime()) as [
        Date,
        Date,
      ];
    }
    if (start) return start;
    if (end) return end;
    return null;
  })();

  const handleDateClick = (clickedDate: Date) => {
    if (onDateClick) {
      onDateClick(dayjs(clickedDate).format('YYYY-MM-DD'));
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (selectionMode === 'range' && view === 'month') {
      if (dateStart && !dateEnd) {
        if (dayjs(date).isAfter(dayjs(dateStart), 'day')) {
          return 'open-range-date';
        }
      }
      if (dateEnd && !dateStart) {
        if (dayjs(date).isBefore(dayjs(dateEnd), 'day')) {
          return 'open-range-date';
        }
      }
    }
    return null;
  };

  return (
    <Calendar
      key={activeStartDate} // activeStartDate가 바뀔 때마다 캘린더를 새로 렌더링합니다.
      onChange={(value) => handleDateClick(value as Date)}
      value={calendarValue}
      selectRange={false}
      formatDay={(_, date) => dayjs(date).format('D')}
      formatShortWeekday={(_, date) =>
        ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
      }
      tileClassName={tileClassName}
      defaultActiveStartDate={dayjs(activeStartDate).toDate()}
      maxDetail={maxDetail}
      minDetail={minDetail}
    />
  );
};

export default CustomCalendar;
