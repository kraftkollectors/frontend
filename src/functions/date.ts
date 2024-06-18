export function getYearsBeforeToday() {
    const currentYear = new Date().getFullYear();
    const years = [];
  
    for (let year = currentYear - 29; year <= currentYear; year++) {
      years.push(year.toString());
    }
  
    return years.reverse();
  }

  export function formatDate(date:string){
    return new Date(date).toLocaleDateString()
  }

export function formatTime(time:string){
  const parts = time.split(':');
  if(parts.length !== 2) return time;
  return `${parts[0]}:${parts[1]} ${Number(parts[0]) >= 12 ? 'PM' : 'AM'}`
}

export function formatChatTime(timestamp:string) {
  const date = new Date(timestamp);
  const now = new Date();
  
  const diffMs = Math.abs(now.getTime() - date.getTime()); // Difference in milliseconds
  
  // Helper function to pad numbers with leading zeros
  const pad = (num:number) => (num < 10 ? '0' + num : num.toString());

  // If the difference is more than a day, return the time in "hh:mm am/pm" format
  if (diffMs >= 24 * 60 * 60 * 1000) {
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const period = Number(hours) < 12 ? 'am' : 'pm';
    const formattedTime = `${Number(hours) % 12 || 12}:${minutes} ${period}`;
    return formattedTime.toLowerCase(); // Return time in lowercase
  }

  // Otherwise, return the time difference in relative format ("now", "2m", "3h")
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return 'now';
  }
}

// Example usage:
// const timestamp = "2024-06-17T21:37:16.333Z";
// console.log(formatTime(timestamp)); // Example output: "2h"


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
  const formatDate = (date: Date): string => {
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
  return formatDate(date);
}


export function compareDates(updated: string, checked: string): string {
  // Parse date strings into Date objects
  const updatedTime = new Date(updated);
  const checkedTime = new Date(checked);

  // Calculate the difference in milliseconds
  const timeDifference = updatedTime.getTime() - checkedTime.getTime();

  // Convert milliseconds to seconds
  const secondsDifference = Math.abs(timeDifference / 1000);

  // Check if the time difference is more than 50 seconds
  if (secondsDifference > 50) {
      return updated; // return 'updated' as a date string
  } else {
      return 'online'; // return 'online' if less than or equal to 50 seconds apart
  }
}