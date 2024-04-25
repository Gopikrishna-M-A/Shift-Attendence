import publicHolidays from './publicHolidays'

function generateSchedule(year, month, employees) {
  const shifts = ["Morning", "Evening", "Night"];
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // const publicHolidays = [
  //   {
  //     date: "January 26",
  //     day: "Thursday",
  //     event: "Republic Day"
  //   },
  //   {
  //     date: "March 29",
  //     day: "Friday",
  //     event: "Good Friday"
  //   },
  //   {
  //     date: "April 10",
  //     day: "Wednesday",
  //     event: "Ramzan"
  //   },
  //   {
  //     date: "August 15",
  //     day: "Tuesday",
  //     event: "Independence Day"
  //   },
  //   {
  //     date: "August 29",
  //     day: "Tuesday",
  //     event: "Onam"
  //   },
  //   {
  //     date: "October 02",
  //     day: "Monday",
  //     event: "Gandhi Jayanti"
  //   },
  //   {
  //     date: "October 23",
  //     day: "Monday",
  //     event: "Mahanavami"
  //   },
  //   {
  //     date: "October 24",
  //     day: "Tuesday",
  //     event: "Vijayadashami"
  //   },
  //   {
  //     date: "December 25",
  //     day: "Monday",
  //     event: "Christmas"
  //   }
  // ];

 

  const patterns = [
    [
      [employees[1], employees[1], employees[2]], //sunday 0
      [employees[0], employees[0], employees[2]], //monday 1
      [employees[0], employees[1], employees[2]], //tuesday
      [employees[0], employees[1], employees[2]], //wednesday
      [employees[0], employees[1], employees[2]], //thursday
      [employees[0], employees[1], employees[2]], //friday
      [employees[0], employees[1], employees[1]], //saturday 2
    ],
    [
      [employees[0], employees[0], employees[1]], //sunday 2
      [employees[2], employees[2], employees[1]], //monday 0
      [employees[2], employees[0], employees[1]], //tuesday
      [employees[2], employees[0], employees[1]], //wednesday
      [employees[2], employees[0], employees[1]], //thursday
      [employees[2], employees[0], employees[1]], //friday
      [employees[2], employees[2], employees[0]], //ssturday 1
    ],
    [
      [employees[2], employees[0], employees[0]], //sunday 1
      [employees[1], employees[0], employees[0]], //monday 2
      [employees[1], employees[2], employees[0]], //tuesday
      [employees[1], employees[2], employees[0]], //wednesday
      [employees[1], employees[2], employees[0]], //thursday
      [employees[1], employees[2], employees[0]], //friday
      [employees[1], employees[2], employees[2]], //saturday 0
    ],
  ];

  const schedule = [];

  const daysInMonth = new Date(year, month, 0).getDate();

  // for (let day = 1; day <= daysInMonth; day++) {
  //   const date = new Date(year, month - 1, day);
  //   const dayOfWeek = date.getDay();
  //   const patternIndex = Math.floor(day / 7) % 3;

  //   const pattern = patterns[patternIndex];
  //   const dayPattern = pattern[dayOfWeek];

  //   for (let shiftIndex = 0; shiftIndex < 3; shiftIndex++) {
  //     const shift = shifts[shiftIndex];
  //     const employee = dayPattern ? dayPattern[shiftIndex] : "";

  //     schedule.push({
  //       Date: `${year}-${month.toString().padStart(2, "0")}-${day
  //         .toString()
  //         .padStart(2, "0")}`,
  //       Day: daysOfWeek[dayOfWeek],
  //       Shift: shift,
  //       Employee: employee,
  //     });
  //   }
  // }
  let patternIndex = 0;
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    var dayOfWeek = date.getDay();
    var dayOfWeekCopy = null
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    // Check if the current date is a public holiday
    const publicHoliday = publicHolidays.find((holiday) => holiday.date === formattedDate);
    // console.log("publicHoliday",publicHoliday,dayOfWeek);





    if (publicHoliday) {
      if (dayOfWeek !== 0 && dayOfWeek !== 6 && dayOfWeek !== 1) {
          if (dayOfWeek == 2){
            dayOfWeekCopy = 6
          }else if(dayOfWeek == 3){
            dayOfWeekCopy = 0
          }else if(dayOfWeek == 4){
            dayOfWeekCopy = 6
          }else if(dayOfWeek == 5){
            dayOfWeekCopy = 1
          }
      }
    }
    if (dayOfWeekCopy != null){
      dayOfWeek = dayOfWeekCopy

    }

    if (dayOfWeek === 0) {
      patternIndex = (patternIndex + 1) % 3;
    }
    // console.log("day pattern",day,patternIndex);


    // patternIndex = Math.floor(day / 7) % 3;

    const pattern = patterns[patternIndex];
    const dayPattern = pattern[dayOfWeek];

    for (let shiftIndex = 0; shiftIndex < 3; shiftIndex++) {
      const shift = shifts[shiftIndex];
      const employee = dayPattern ? dayPattern[shiftIndex] : "";

      schedule.push({
        Date: `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`,
        Day: daysOfWeek[dayOfWeek],
        Shift: shift,
        Employee: employee,
        Event: publicHoliday ? publicHoliday.event : "", // Include event name if it's a public holiday
      });
    }
  }

  return schedule;
}

export default generateSchedule