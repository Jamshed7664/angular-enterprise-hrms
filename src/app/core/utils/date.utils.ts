export function daysBetween(fromDate: string, toDate: string): number {
  const start = new Date(fromDate).getTime();
  const end = new Date(toDate).getTime();
  return Math.max(1, Math.floor((end - start) / 86_400_000) + 1);
}

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}
