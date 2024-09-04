// 1000 -> 00:00
export const formatDurationSecondToTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// ISO 8601(PT5M42S) -> 00:00:00
export const formatDurationISOToTime = (isoDuration: string): string => {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  // 타입 가드
  if (!match) {
    return '0:00:00';
  }

  const hours = match[1] ? match[1].slice(0, -1) : '0';
  const minutes = match[2] ? match[2].slice(0, -1) : '0';
  const seconds = match[3] ? match[3].slice(0, -1) : '0';

  return `${hours}:${minutes}:${seconds}`;
};
