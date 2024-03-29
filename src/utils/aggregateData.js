function aggregateData(data, frequency) {
  // Define an object to store aggregated results
  let aggregatedData = {};

  // Loop through each record in the data array
  data.forEach((record) => {
    // Parse the date from the record
    const recordDate = new Date(record.Date);

    // Determine the frequency date range based on the frequency parameter
    let startDate, endDate;
    if (frequency === "weekly") {
      startDate = new Date(
        recordDate.getFullYear(),
        recordDate.getMonth(),
        recordDate.getDate() - recordDate.getDay()
      ); // Start of current week
      endDate = new Date(
        recordDate.getFullYear(),
        recordDate.getMonth(),
        recordDate.getDate() - recordDate.getDay() + 6
      ); // End of current week
    } else if (frequency === "monthly") {
      startDate = new Date(recordDate.getFullYear(), recordDate.getMonth(), 1); // Start of current month
      endDate = new Date(
        recordDate.getFullYear(),
        recordDate.getMonth() + 1,
        0
      ); // End of current month
    } else if (frequency === "yearly") {
      startDate = new Date(recordDate.getFullYear(), 0, 1); // Start of current year
      endDate = new Date(recordDate.getFullYear(), 11, 31); // End of current year
    }

    // Convert start and end dates to string format
    const startDateString = startDate.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];

    // Create a key for the aggregated data based on the frequency date range
    const key = `${startDateString} - ${endDateString}`;

    // If the key doesn't exist in the aggregatedData object, initialize it with 0 miles
    if (!aggregatedData[key]) {
      aggregatedData[key] = 0;
    }

    // Add the miles driven from the current record to the aggregated data
    aggregatedData[key] += parseInt(record["Miles Driven"]);
  });

  return aggregatedData;
}

// const aggregatedData = {"23/03/2023 - 23/04/2023": 24, .....}

module.exports = aggregateData;
