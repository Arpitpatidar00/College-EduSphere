export const timeAgo = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const seconds = Math.floor((now - past) / 1000);

  if (seconds < 60) return "Just a second ago";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
};
export const timeShort = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past; // Difference in milliseconds
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds}s`; // e.g., "23s"
  }
  if (minutes < 60) {
    return `${minutes % 60}m`; // e.g., "23m"
  }
  if (hours < 24) {
    return `${hours}h`; // e.g., "1h"
  }
  if (hours < 48) {
    return `${days}d`; // e.g., "1d" (up to 48 hours)
  }

  return `${days}d`; // Beyond 48 hours, still in days
};
