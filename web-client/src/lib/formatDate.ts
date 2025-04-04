export default function formatDate(date: string) {
  return new Date(date).toLocaleString("bg-BG", {
    timeZone: "Europe/Sofia",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
