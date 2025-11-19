// utils/timezone.js
import moment from "moment-timezone";

export const isValidTimezone = (tz) => {
  return !!(tz && typeof tz === "string" && moment.tz.zone(tz));
};
