import moment from "moment";

export const FormatDate = (timestamp) => {
  return new Date(timestamp);
};

export const getTimestamp = (date) => {
  return date.valueOf / 1000;
};

export const fomratDateForText = (date) => {
  return moment(date).format("ll");
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return timeString;
};

export const getDatesRange = (startDate, endDate) => {
  const start = moment(new Date(startDate), "MM/DD/YYYY");
  const end = moment(new Date(endDate), "MM/DD/YYYY");
  const dates = [];

  while (start.isSameOrBefore(end)) {
    dates.push(start.format("MM/DD/YYYY"));
    start.add(1, "days");
  }
  console.log("dates", dates);
  return dates;
};

export const getDateRangeToDisplay = () => {
  const dateList = [];

  for (let index = 0; index < 7; index++) {
    dateList.push({
      date: moment().add(index, "days").format("DD"),
      day: moment().add(index, "days").format("dd"),
      formattedDate: moment().add(index, "days").format("L"),
    });
  }

  return dateList;
};
