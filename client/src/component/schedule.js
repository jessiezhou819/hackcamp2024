import React, { useState } from 'react';

function Schedule() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState('');

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const changeMonth = (direction) => {
    if (direction === 'next') {
      setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
      if (currentMonth === 11) setCurrentYear((prevYear) => prevYear + 1);
    } else if (direction === 'prev') {
      setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
      if (currentMonth === 0) setCurrentYear((prevYear) => prevYear - 1);
    }
  };

  const handleDateClick = (day) => {
    setSelectedDate(`${currentYear}-${currentMonth + 1}-${day}`);
    setEventText(events[`${currentYear}-${currentMonth + 1}-${day}`] || '');
  };

  const handleEventChange = (e) => setEventText(e.target.value);

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      setEvents((prevEvents) => ({
        ...prevEvents,
        [selectedDate]: eventText,
      }));
      setEventText('');
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);

  const dates = [];
  for (let i = 0; i < firstDayOfMonth; i++) dates.push('');
  for (let i = 1; i <= daysInMonth; i++) dates.push(i);

  return (
    <div>
    <h2>
  {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
    </h2>

      <div>
        <button onClick={() => changeMonth('prev')}>Previous</button>
        <button onClick={() => changeMonth('next')}>Next</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', marginTop: '10px' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} style={{ fontWeight: 'bold', textAlign: 'center' }}>{day}</div>
        ))}

        {dates.map((date, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              textAlign: 'center',
              backgroundColor: date ? '#f0f0f0' : 'transparent',
              borderRadius: '4px',
              position: 'relative',
              cursor: date ? 'pointer' : 'default',
            }}
            onClick={() => date && handleDateClick(date)}
          >
            {date}
            {events[`${currentYear}-${currentMonth + 1}-${date}`] && (
              <div style={{ fontSize: '0.8em', color: 'blue', marginTop: '5px' }}>
                {events[`${currentYear}-${currentMonth + 1}-${date}`]}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedDate && (
        <form onSubmit={handleEventSubmit} style={{ marginTop: '20px' }}>
          <h3>Add Event for {selectedDate}</h3>
          <input
            type="text"
            value={eventText}
            onChange={handleEventChange}
            placeholder="Enter event"
            style={{ padding: '5px', width: '80%' }}
          />
          <button type="submit" style={{ padding: '5px 10px' }}>Add Event</button>
        </form>
      )}
    </div>
  );
}

export default Schedule;