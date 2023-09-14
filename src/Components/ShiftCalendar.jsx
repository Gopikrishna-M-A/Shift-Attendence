import React from 'react'
import { Table, Typography } from 'antd'
import generateSchedule from './Logic'

const { Title } = Typography;


const ShiftCalendar = ({year, month, emp1, emp2, emp3}) => {  

  const employees = [emp1, emp2, emp3]
  const pattern = generateSchedule(year, month, employees)
  
  const shiftData = {};

  pattern.forEach((entry) => {
    const date = entry.Date
    const shift = entry.Shift
    const employee = entry.Employee

    if (!shiftData[date]) {
      shiftData[date] = {}
    }

    if (!shiftData[date][shift]) {
      shiftData[date][shift] = []
    }

    shiftData[date][shift].push(employee)
  })


  const tableData = Object.keys(shiftData).map((date) => {
    const shifts = shiftData[date]
    const row = {
      key: date,
      Date: date,
      Day: pattern.find((entry) => entry.Date === date)?.Day || '',
    };

    shifts['Morning'] ? (row['Morning Shift'] = shifts['Morning'].join(', ')) : ''
    shifts['Evening'] ? (row['Evening Shift'] = shifts['Evening'].join(', ')) : ''
    shifts['Night'] ? (row['Night Shift'] = shifts['Night'].join(', ')) : ''


    if (row['Day'] === 'SUN' || row['Day'] === 'MON' || row['Day'] === 'SAT') {
      const employeeTakingOff = pattern.find((entry) => entry.Date === date)?.Employee

      const indexOfFirstEmployee = employees.indexOf(employeeTakingOff)
      const indexOfEmployeeTakingOff = (indexOfFirstEmployee + 1) % employees.length
      const nextEmployee = employees[indexOfEmployeeTakingOff]
      row['Off/Holiday'] = nextEmployee + " OFF"
    } 

    return row
  });



  const columns = [
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
    },
    {
      title: 'Day',
      dataIndex: 'Day',
      key: 'Day',
    },
    {
      title: 'Morning Shift',
      dataIndex: 'Morning Shift',
      key: 'Morning Shift',
    },
    {
      title: 'Evening Shift',
      dataIndex: 'Evening Shift',
      key: 'Evening Shift',
    },
    {
      title: 'Night Shift',
      dataIndex: 'Night Shift',
      key: 'Night Shift',
    },
    {
      title: 'Off/Holiday',
      dataIndex: 'Off/Holiday',
      key: 'Off/Holiday',
    },

  ];


  



  return (
    <div>
    <Title className='title' level={3} style={{textAlign:"center"}}>Schedule for {year}-{month.toString().padStart(2, '0')}</Title>
    <Table dataSource={tableData} columns={columns} pagination={false} />
  </div>
  )
}

export default ShiftCalendar


