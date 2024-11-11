import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css"; // Import your custom styles

const localizer = momentLocalizer(moment);

const extractedText = `
Vancouver 2024W1 CPSC_V 322-102 - Introduction to Artificial Intelligence 12/20/2024 19:00:00 SWNG-Floor 1-Room 122 In Person Learning -
Vancouver 2024W1 CPSC_V 330-101 - Applied Machine Learning 12/18/2024 19:00:00 See Instructor -
`;

const examSchedule = parseExamSchedule(extractedText);

function parseExamSchedule(text) {
  const examSchedule = [];
  const lines = text.split("\n");

  const regex =
    /(?:\w+\s+\d{4}W\d\s+.*?-\s+)?(.+?)\s+(\d{2}\/\d{2}\/\d{4})\s+(\d{2}:\d{2}:\d{2})/;

  lines.forEach((line) => {
    const match = line.match(regex);
    if (match) {
      const [, title, date, startTime] = match;
      const [month, day, year] = date.split("/");
      const formattedDate = `${year}-${month}-${day}`;

      examSchedule.push({
        title: title.trim(),
        date: formattedDate,
        startTime: startTime.slice(0, 5), // "HH:MM" format
      });
    }
  });

  return examSchedule;
}

const UploadCalendar = () => {
  const [countdown, setCountdown] = useState("");

  // Find the earliest upcoming exam date
  const earliestExam = examSchedule.reduce((earliest, exam) => {
    const examDate = new Date(`${exam.date}T${exam.startTime}`);
    return !earliest || examDate < new Date(earliest.date) ? exam : earliest;
  }, null);

  useEffect(() => {
    if (!earliestExam) return;

    const examDate = new Date(`${earliestExam.date}T${earliestExam.startTime}`);

    const updateCountdown = () => {
      const now = new Date();
      const timeDiff = examDate - now;

      if (timeDiff <= 0) {
        setCountdown("The exam has started or already passed!");
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);

      setCountdown(
        `Time until earliest exam (${earliestExam.title}): ${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    };

    // Update countdown every second
    const interval = setInterval(updateCountdown, 1000);

    // Cleanup the interval when component unmounts
    return () => clearInterval(interval);
  }, [earliestExam]);

  const events = examSchedule.map((exam) => {
    const start = new Date(`${exam.date}T${exam.startTime}`);
    const end = new Date(start);
    end.setHours(start.getHours() + 2, start.getMinutes() + 30);

    return {
      title: exam.title,
      start,
      end,
    };
  });

  return (
    <div className="calendar-container">
      <h2 className="countdown-text">{countdown}</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "75vh", width: "100%" }}
      />
    </div>
  );
};

export default UploadCalendar;
