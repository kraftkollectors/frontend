import { SERVER_TIME_DIFFERENCE } from "@/utils/constants";
import { debugLog } from "./helpers";

export function getYearsBeforeToday() {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear - 29; year <= currentYear; year++) {
    years.push(year.toString());
  }

  return years.reverse();
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}

export function formatTime(time: string) {
  const parts = time.split(':');
  if (parts.length !== 2) return time;
  const isPm = Number(parts[0]) >= 12;
  return `${ isPm ? Number(parts[0]) - 12 : parts[0]}:${parts[1]} ${ isPm ? 'PM' : 'AM'}`
}

export function formatChatTime(timestamp: string) {
  const date = new Date(timestamp);
  date.setHours(date.getHours() + SERVER_TIME_DIFFERENCE);
  const now = new Date();

  const diffMs = Math.abs(now.getTime() - date.getTime()); // Difference in milliseconds

  // Helper function to pad numbers with leading zeros
  function pad(num: number) { return (num < 10 ? '0' + num : num.toString()); }

  // If the date is yesterday
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  if (date.toDateString() === yesterday.toDateString()) {
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const formattedTime = `${hours}:${minutes}`;
    return formatTime(formattedTime.toLowerCase()); // Return time in lowercase
  }

  // Otherwise, return the time difference in relative format ("now", "2m", "3h")
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}dy`;
  } else if (hours > 0) {
    return `${hours}hr`;
  } else if (minutes > 0) {
    return `${minutes}min`;
  } else {
    return 'now';
  }
}

export function getChatDate(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();

  // Function to check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Function to format date as dd/mm/yy
  const _formatDate = (date: Date): string => {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  // Check if it's today
  if (isSameDay(date, now)) {
    return 'today';
  }

  // Check if it's yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (isSameDay(date, yesterday)) {
    return 'yesterday';
  }

  // Otherwise, return the date as dd/mm/yy
  return _formatDate(date);
}

export function compareDates(updated: string, checked?: string): string {
  // Parse date strings into Date objects
  const checkedTime = checked ? new Date(checked) : new Date();
  const parts = updated.split(/[ :-]/);
  let updatedTime = new Date(`${parts[2]}-${parts[1]}-${parts[0]} ${parts[3]}:${parts[4]}:${parts[5]}`);
  updatedTime.setHours(updatedTime.getHours() + SERVER_TIME_DIFFERENCE);

  // debugLog(updatedTime.getTime());
  // debugLog(checkedTime.getTime());

  // Calculate the difference in milliseconds
  const timeDifference = updatedTime.getTime() - checkedTime.getTime();

  // Convert milliseconds to seconds
  const secondsDifference = Math.abs(timeDifference / 1000);

  // Check if the time difference is more than 50 seconds
  if (secondsDifference > 50) {
    updatedTime.setHours(updatedTime.getHours() + SERVER_TIME_DIFFERENCE)
    return updatedTime.toString(); // return 'updated' as a date string
  } else {
    return 'online'; // return 'online' if less than or equal to 50 seconds apart
  }
}

export function formatChatDate(dateString: string): string {
  const date = new Date(dateString);
  date.setHours(date.getHours() + SERVER_TIME_DIFFERENCE);
  const now = new Date();

  // Calculate the difference in milliseconds between now and the provided date
  const diffMs = now.getTime() - date.getTime();

  // Convert the difference to days
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // If the date is within the same day
  if (diffDays === 0) {
    return formatChatTime(dateString); // Return the input date string
  }

  // If the date is yesterday
  if (diffDays === 1) {
    return 'yesterday';
  }

  // If the date is within 7 days (less than a week)
  if (diffDays <= 7) {
    return `${diffDays} d`;
  }

  // If the date is within 30 days (less than a month)
  if (diffDays <= 30) {
    return `${Math.ceil(diffDays / 7)} wk`;
  }

  // If the date is more than a month ago, return the actual date in MM/DD/YYYY format
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  return formattedDate;
}
