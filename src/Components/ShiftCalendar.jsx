import React from "react";
import { Table, Typography } from "antd";
import generateSchedule from "./Logic";
import publicHolidays from "./publicHolidays";

const { Title } = Typography;

const colorMap = {
  BIJU: "#b3ffb3", // lighter green
  JOHNSON: "#b3b3ff", // lighter blue
  ANIL: "#ffffb3", // lighter yellow
};

function convertDateFormat(dateString) {
  // Split the date string into month and day
  const [monthStr, dayStr] = dateString.split(" ");

  // Get the numerical month value (JavaScript months are 0-based)
  const month = new Date(Date.parse(`${monthStr} 1, 2024`)).getMonth() + 1;

  // If month or day parsing fails, return null
  if (isNaN(month) || isNaN(dayStr)) {
    return null;
  }

  // Pad the day with leading zero if necessary
  const day = dayStr.padStart(2, "0");

  // Construct the final date string in the format YYYY-MM-DD
  const formattedDate = `2024-${month.toString().padStart(2, "0")}-${day}`;

  return formattedDate;
}

const ShiftCalendar = ({ year, month, emp1, emp2, emp3 }) => {
  const employees = [emp1, emp2, emp3];
  const pattern = generateSchedule(year, month, employees);

  const shiftData = {};

  pattern.forEach((entry) => {
    const date = entry.Date;
    const shift = entry.Shift;
    const employee = entry.Employee;

    if (!shiftData[date]) {
      shiftData[date] = {};
    }

    if (!shiftData[date][shift]) {
      shiftData[date][shift] = [];
    }

    shiftData[date][shift].push(employee);
  });

  const tableData = Object.keys(shiftData).map((date) => {
    const shifts = shiftData[date];
    const row = {
      key: date,
      Date: date,
      Day: pattern.find((entry) => entry.Date === date)?.Day || "",
    };

    shifts["Morning"]
      ? (row["Morning Shift"] = shifts["Morning"].join(", "))
      : "";
    shifts["Evening"]
      ? (row["Evening Shift"] = shifts["Evening"].join(", "))
      : "";
    shifts["Night"] ? (row["Night Shift"] = shifts["Night"].join(", ")) : "";

    if (row["Day"] === "SUN" || row["Day"] === "MON" || row["Day"] === "SAT") {
      const workingEmployess = [];
      workingEmployess.push(row["Evening Shift"]);
      workingEmployess.push(row["Morning Shift"]);
      workingEmployess.push(row["Night Shift"]);

      const publicHoliday = publicHolidays.some(
        (holiday) => row.Date === convertDateFormat(holiday.date)
      );

      const employeeTakingOff = employees.filter(
        (employee) => !workingEmployess.includes(employee)
      );
      // console.log("employeeTakingOff",colorMap[employeeTakingOff]);
      // {publicHoliday ? row['Off/Holiday'] = `HOLIDAY (${employeeTakingOff})` : row['Off/Holiday'] = employeeTakingOff + " OFF"}
      if (publicHoliday) {
        row["Off/Holiday"] = `HOLIDAY (${employeeTakingOff})`;
      } else {
        const uniqueEmployees = [...new Set(workingEmployess)];
        row["Off/Holiday"] = employeeTakingOff.map((emp, index) => (
          <div
            key={index}
            style={{ backgroundColor: colorMap[emp] || "white" }}
          >
            {emp}
          </div>
        ));
      }
    }

    return row;
  });

  tableData.forEach((item) => {
    const date = new Date(item.Date);
    const options = { weekday: "short" };
    item.Day = date.toLocaleDateString("en-US", options);
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Day",
      dataIndex: "Day",
      key: "Day",
    },
    {
      title: "Morning Shift",
      dataIndex: "Morning Shift",
      key: "Morning Shift",
    },
    {
      title: "Evening Shift",
      dataIndex: "Evening Shift",
      key: "Evening Shift",
    },
    {
      title: "Night Shift",
      dataIndex: "Night Shift",
      key: "Night Shift",
    },
    {
      title: "Off/Holiday",
      dataIndex: "Off/Holiday",
      key: "Off/Holiday",
      render: (text) => <div>{text}</div>,
    },
  ];

  const rowClassName = (record, index) => {
    const date = new Date(record.Date);
    const weekNumber = Math.ceil((date.getDate() + 6 - date.getDay()) / 7);
    return weekNumber % 2 === 0 ? "even-week-row" : "odd-week-row";
  };

  return (
    <div>
      <Title className="title" level={3} style={{ textAlign: "center" }}>
        Schedule for {year}-{month.toString().padStart(2, "0")}
      </Title>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        rowClassName={rowClassName}
      />
    </div>
  );
};

export default ShiftCalendar;
