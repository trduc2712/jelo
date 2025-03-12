import dayjs from 'dayjs';

export const formatIso8601 = (
  isoString: Date,
  fullDate: boolean = false,
  isHumanReadable: boolean = true
): string => {
  return isHumanReadable
    ? dayjs(isoString).format(`${fullDate ? 'h:mm A' : ''}DD MMM, YYYY`)
    : dayjs(isoString).format('YYYY-MM-DD');
};
