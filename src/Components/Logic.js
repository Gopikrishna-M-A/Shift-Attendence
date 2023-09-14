function generateSchedule(year, month, employees) {
  const shifts = ["Morning", "Evening", "Night"];
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const patterns = [
    [
      [employees[1], employees[1], employees[0]], //sunday
      [employees[2], employees[2], employees[1]], //monday
      [employees[0], employees[1], employees[2]], //tuesday
      [employees[0], employees[1], employees[2]], //wednesday
      [employees[0], employees[1], employees[2]], //thursday
      [employees[0], employees[1], employees[2]], //friday
      [employees[0], employees[0], employees[2]], //saturday
    ],
    [
      [employees[0], employees[0], employees[2]], //sunday
      [employees[1], employees[1], employees[0]], //monday
      [employees[2], employees[0], employees[1]], //tuesday
      [employees[2], employees[0], employees[1]], //wednesday
      [employees[2], employees[0], employees[1]], //thursday
      [employees[2], employees[0], employees[1]], //friday
      [employees[2], employees[2], employees[1]], //ssturday
    ],
    [
      [employees[2], employees[2], employees[1]], //sunday
      [employees[0], employees[0], employees[2]], //monday
      [employees[1], employees[2], employees[0]], //tuesday
      [employees[1], employees[2], employees[0]], //wednesday
      [employees[1], employees[2], employees[0]], //thursday
      [employees[1], employees[2], employees[0]], //friday
      [employees[1], employees[1], employees[0]], //saturday
    ],
  ];

  const schedule = [];

  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    const patternIndex = Math.floor(day / 7) % 3;

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
      });
    }
  }

  return schedule;
}

export default generateSchedule