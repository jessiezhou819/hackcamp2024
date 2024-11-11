import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css"; // Import your custom styles

const localizer = momentLocalizer(moment);

const examSchedule = [
  {
    title: "Math Exam",
    date: "2024-12-12",
    startTime: "09:00",
    endTime: "12:00",
  },
  {
    title: "Physics Exam",
    date: "2024-12-15",
    startTime: "13:00",
    endTime: "16:00",
  },
];

// Function to parse exam schedule text (if needed)
function parseExamSchedule(text) {
  const examSchedule = [];
  const lines = text.split("\n");

  // Generalized regex pattern to capture title, date, and time
  const regex = /(?:\w+\s+\d{4}W\d\s+.*?-\s+)?(.+?)\s+(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/;

  lines.forEach((line) => {
    const match = line.match(regex);
    if (match) {
      const [, title, date, startTime] = match;

      // Convert date from MM/DD/YYYY to YYYY-MM-DD format
      const [month, day, year] = date.split("/");
      const formattedDate = `${year}-${month}-${day}`;

      // Push parsed exam details into the array
      examSchedule.push({
        title: title.trim(),
        date: formattedDate,
        startTime: startTime.slice(0, 5), // Use "HH:MM" format
        endTime: "TBD", // Placeholder for end time
      });
    }
  });

  return examSchedule;
}

// Main UploadCalendar component
const UploadCalendar = () => {
  // Convert examSchedule data into calendar events
  const events = examSchedule.map((exam) => ({
    title: exam.title,
    start: new Date(`${exam.date}T${exam.startTime}`),
    end: new Date(`${exam.date}T${exam.endTime}`),
  }));

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh", width: "900vh" }} // Adjust calendar dimensions
      />
    </div>
  );
};

export default UploadCalendar;
