import dayjs from 'dayjs';

export const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatTime = (date: string) => {
  return dayjs(date).format('HH:mm:ss');
};

export const formatDateTime = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export const formatNumber = (number: number) => {
  return number.toLocaleString();
};
