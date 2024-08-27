export const formatNumberToK = (count: number) => {
  if (count < 1000) return String(count);

  return (count / 1000).toFixed(1) + 'K';
};
