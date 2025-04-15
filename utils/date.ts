export const getFormattedPostDate = (date: string | undefined) => {
  if (!date || isNaN(Date.parse(date))) {
    return 'N/A';
  }
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString('en-US', options);
}