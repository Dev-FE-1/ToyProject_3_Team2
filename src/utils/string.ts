const MAX_LENGTH = 15;

export const shortenString = (str: string): string => {
  if (str.length <= MAX_LENGTH) {
    return str;
  }
  return str.slice(0, MAX_LENGTH) + '...';
};
