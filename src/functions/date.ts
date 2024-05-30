export function getYearsBeforeToday() {
    const currentYear = new Date().getFullYear();
    const years = [];
  
    for (let year = currentYear - 29; year <= currentYear; year++) {
      years.push(year.toString());
    }
  
    return years.reverse();
  }