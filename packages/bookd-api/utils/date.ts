export function addDays(days: number, date = new Date()) {
  date.setDate(date.getDate() + days);

  return date;
}

export function addHours(hours: number, date = new Date()) {
  date.setHours(date.getDate() + hours);

  return date;
}
