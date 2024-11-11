import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "./calendar.css"; // Import your custom styles

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

const UploadCalendar = ({}) => {
  // Convert parsed data into calendar events
  const events = examSchedule.map((exam) => ({
    title: exam.title,
    start: new Date(`${exam.date}T${exam.startTime}`),
    end: new Date(`${exam.date}T${exam.endTime}`),
  }));

  return (
    <div style={{ height: "600px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
};

export default UploadCalendar;
