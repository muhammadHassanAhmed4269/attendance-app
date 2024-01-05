async function getCurrentYear() {
  try {
    const currentYear = new Date(Date.now()).getFullYear();
    console.log("Current year:", currentYear);
    return currentYear;
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentMonth() {
  try {
    const currentMonthIndex = new Date().getMonth(); // Get the zero-based index
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentMonthName = monthNames[currentMonthIndex];
    console.log("Current month:", currentMonthName);
    return currentMonthName;
  } catch (error) {
    console.log(error);
  }
}
