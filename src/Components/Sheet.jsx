import React from "react";
import ShiftCalendar from "./ShiftCalendar.jsx";
import { Button } from "antd";
import { MailOutlined, DownloadOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";







const Sheet = () => {
  const location = useLocation();
  const { year, month, emp1, emp2, emp3 } = location.state;

  const generateAndSavePDF = () => {
    const element = document.getElementById("pdf-page");

    const options = {
      margin: 10,
      filename: "Attendence.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save("Shift Attendance.pdf");
  };

  const openEmailClient = () => {
    // Create a mailto link with the subject, body, and attachment
    const subject = encodeURIComponent("Shift Attendance Report");
    const body = encodeURIComponent("Please find the attached Shift Attendance Report.");
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;

    // Open the user's default email client with the mailto link
    window.location.href = mailtoLink;
  };

  return (
    <div className="page">
      <div className="section">
        <Button 
        className="mail-btn" 
        icon={<MailOutlined />}
        onClick={openEmailClient}
        >
          Mail
        </Button>
        <Button
          onClick={generateAndSavePDF}
          className="download-btn"
          icon={<DownloadOutlined />}
        >
          Download
        </Button>
        <div  id="pdf-page">
          <ShiftCalendar
            year={year}
            month={month}
            emp1={emp1}
            emp2={emp2}
            emp3={emp3}
          />
        </div>
      </div>
    </div>
  );
};

export default Sheet;
