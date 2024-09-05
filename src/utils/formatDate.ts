import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc); // UTC 플러그인 추가
dayjs.extend(timezone); // timezone 플러그인 추가

export const formatTimeWithUpdated = (dateString: string): string => {
  const date = dayjs(dateString).utc();
  const now = dayjs().utc();

  const diffInHours = now.diff(date, 'hour');
  const diffInDays = now.diff(date, 'day');
  const diffInWeeks = now.diff(date, 'week');
  const diffInMonths = now.diff(date, 'month');
  const diffInYears = now.diff(date, 'year');

  if (diffInHours < 1) {
    return `방금 업데이트`;
  } else if (diffInHours > 1 && diffInHours < 24) {
    return `${diffInHours}시간 전 업데이트`;
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전 업데이트`;
  } else if (diffInWeeks > 0 && diffInMonths < 1) {
    return `${diffInWeeks}주 전 업데이트`;
  } else if (diffInMonths > 0 && diffInYears < 1) {
    return `${diffInMonths}개월 전 업데이트`;
  } else if (diffInYears > 0) {
    return `${diffInYears}년 전 업데이트`;
  } else {
    return `잘못된 날짜 형식입니다.`;
  }
};
