// https://date-fns.org/v2.30.0/docs

import {
  compareAsc,
  format,
  formatDistance,
  formatRelative,
  subDays,
} from "date-fns";

export default function dateFormat(date) {
  return format(new Date(date), "dd-MM-yyyy");
  //=> '2014-02-11'
}

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];
dates.sort(compareAsc);
//=> [
//   Wed Feb 11 1987 00:00:00,
//   Mon Jul 10 1989 00:00:00,
//   Sun Jul 02 1995 00:00:00
// ]

format(new Date(), "'Today is a' eeee");
//=> "Today is a Thursday"

formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });
//=> "3 days ago"

formatRelative(subDays(new Date(), 3), new Date());
//=> "last Friday at 7:26 p.m."
