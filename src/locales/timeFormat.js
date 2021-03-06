export default {
  en: {
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    amPm: ['am', 'pm'],
    // D is the day of the month, function returns something like...  3rd or 11th
    DoFn: function(D) {
      return (
        D +
        ['th', 'st', 'nd', 'rd'][
          D % 10 > 3 ? 0 : ((D - (D % 10) !== 10) * D) % 10
        ]
      );
    },
  },
  ar: {
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    amPm: ['am', 'pm'],
    // D is the day of the month, function returns something like...  3rd or 11th
    DoFn: function(D) {
      return (
        D +
        ['th', 'st', 'nd', 'rd'][
          D % 10 > 3 ? 0 : ((D - (D % 10) !== 10) * D) % 10
        ]
      );
    },
  },
  fr: {
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    amPm: ['am', 'pm'],
    // D is the day of the month, function returns something like...  3rd or 11th
    DoFn: function(D) {
      return (
        D +
        ['th', 'st', 'nd', 'rd'][
          D % 10 > 3 ? 0 : ((D - (D % 10) !== 10) * D) % 10
        ]
      );
    },
  },
};
