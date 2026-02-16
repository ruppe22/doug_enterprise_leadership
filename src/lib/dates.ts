export function formatDate(iso: string) {
  // Expects YYYY-MM-DD
  const dt = new Date(iso + "T00:00:00");
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(dt);
}
