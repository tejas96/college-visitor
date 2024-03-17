export function formatDate(dateObj: Date): string {
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = dateObj.getFullYear();

  return `${day}-${month}-${year}`;
}
