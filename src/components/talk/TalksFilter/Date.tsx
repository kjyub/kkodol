import { useEffect, useRef, useState } from 'react';
import FilterBox from './Box';
import { useArrayParam } from '@/hooks/useArrayParam';
import CustomCalendar from '@/components/common/Calendar';
import { cn } from '@/utils/cn';
import useDetectClose from '@/hooks/useDetectClose';
import dayjs from 'dayjs';

type CalendarMode = 'start' | 'end' | null;

export default function FilterDates() {
  const {
    value: dateStart,
    setValues: setDateStart,
    clear: clearDateStart,
    setMultiple,
  } = useArrayParam('date_start');
  const {
    value: dateEnd,
    setValues: setDateEnd,
    clear: clearDateEnd,
  } = useArrayParam('date_end');

  const [calendarMode, setCalendarMode] = useState<CalendarMode>(null);
  const [activeDate, setActiveDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );

  const ref = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useDetectClose(
    ref as React.RefObject<HTMLElement>,
  );

  useEffect(() => {
    setIsOpen(calendarMode !== null);
    if (calendarMode === 'start') {
      setActiveDate(dateStart ?? dayjs().format('YYYY-MM-DD'));
    } else if (calendarMode === 'end') {
      setActiveDate(dateEnd ?? dayjs().format('YYYY-MM-DD'));
    }
  }, [calendarMode]);

  useEffect(() => {
    if (!isOpen) {
      setCalendarMode(null);
    }
  }, [isOpen]);

  const handleDateClick = (date: string) => {
    if (calendarMode === 'start') {
      if (dateStart === date) {
        clearDateStart();
      } else if (dateEnd && dayjs(date).isAfter(dayjs(dateEnd))) {
        setMultiple({
          date_start: [dateEnd],
          date_end: [date],
        });
      } else {
        setDateStart([date]);
      }
    } else if (calendarMode === 'end') {
      if (dateEnd === date) {
        clearDateEnd();
      } else if (dateStart && dayjs(date).isBefore(dayjs(dateStart))) {
        setMultiple({
          date_start: [date],
          date_end: [dateStart],
        });
      } else {
        setDateEnd([date]);
      }
    }
    // setCalendarMode(null);
  };

  return (
    <FilterBox title="날짜">
      <div ref={ref} className="flex flex-wrap items-stretch gap-4">
        <Date
          label="시작 날짜"
          value={dateStart}
          onClick={() => {
            setCalendarMode(calendarMode === 'start' ? null : 'start');
          }}
          isFocused={calendarMode === 'start'}
        />

        <span className="flex items-center text-xl font-bold text-stone-700 select-none dark:text-stone-200">
          ~
        </span>

        <Date
          label="종료 날짜"
          value={dateEnd}
          onClick={() => {
            setCalendarMode(calendarMode === 'end' ? null : 'end');
          }}
          isFocused={calendarMode === 'end'}
        />

        <CalendarWrapper isOpen={isOpen}>
          <CustomCalendar
            dateStart={dateStart}
            dateEnd={dateEnd}
            onDateClick={handleDateClick}
            activeStartDate={activeDate}
            maxDetail="month"
            minDetail="month"
          />
        </CalendarWrapper>
      </div>
    </FilterBox>
  );
}

const Date = ({
  label,
  value,
  onClick,
  isFocused,
}: {
  label: string;
  value: string | null;
  onClick: () => void;
  isFocused: boolean;
}) => {
  return (
    <button
      className={cn([
        'flex flex-1 cursor-pointer flex-col items-stretch justify-between rounded-lg border p-2 hover:bg-stone-100 dark:hover:bg-stone-700',
        {
          'border-lime-500': isFocused,
        },
        {
          'border-stone-300 dark:border-stone-700': !isFocused,
        },
      ])}
      onClick={onClick}
    >
      <span className="flex items-center justify-between text-sm text-stone-600 dark:text-stone-300">
        {label}
        <i className="fa-solid fa-calendar text-xs" />
      </span>
      <div className="text-left text-sm font-medium text-stone-700 dark:text-stone-200">
        {value ?? ''}
      </div>
    </button>
  );
};

const CalendarWrapper = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn([
        'absolute inset-x-2 top-[calc(100%-0.5rem)] z-10',
        'flex flex-1 flex-col p-3',
        'rounded-lg border border-stone-300 bg-stone-100 dark:border-stone-700 dark:bg-stone-800',
        'drop-shadow-xl transition-all duration-200',
        { 'pointer-events-none -translate-y-2 opacity-0': !isOpen },
      ])}
    >
      {children}
    </div>
  );
};
