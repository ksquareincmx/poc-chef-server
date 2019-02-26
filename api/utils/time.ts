import * as moment from "moment";

function getTimeFromMins(mins: number): string {
  // do not include the first validation check if you want, for example,
  // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
  if (mins >= 24 * 60 || mins < 0) {
    throw new RangeError(
      "Valid input should be greater than or equal to 0 and less than 1440."
    );
  }

  const hours: number = (mins / 60) | 0;
  const minutes: number = mins % 60 | 0;

  return moment
    .utc()
    .hours(hours)
    .minutes(minutes)
    .format("hh:mm:ss");
}

function getTimeFromEpoch(epoch: number): string {
  return moment
    .unix(epoch)
    .startOf("day")
    .format("YYYY-MM-DD");
}

export { getTimeFromEpoch, getTimeFromMins };
