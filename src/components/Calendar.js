// CalendarComponent.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../style/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../utils/ValidationFunctios';
import { getDaysOff } from '../services/api';

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const CalendarComponent = ({handleDateSelect, view, setappointmentView}) => {
  const [date, setDate] = useState(new Date());
  const [daysOff, setDaysOff] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const responseDaysOff = await getDaysOff();
        if(responseDaysOff){
          setDaysOff(responseDaysOff.data);
        }
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, daysOff);

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setCurrentMonth(activeStartDate);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    handleDateSelect(formatDate(newDate));
    //setView("appointments");
    setappointmentView(view);
  };

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      /*const disabledDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // Example of repeated days
      return disabledDays.includes(date.getDate());*/
      /*const disabledDay = 2; // Example: 1 for disabling all Mondays
      return date.getDay() === disabledDay || date < today -1;*/
      return daysOff && daysOff.includes(daysOfWeek[date.getDay()]);
    }
    return false;
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month' && date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
      return <span className="active-date"></span>;
    }
  };

  return (
    <div className="calendar-container">
      <h3 dir='rtl'>{view === 'appointments' ? 'תורים' : 'תורים מבוטלים'}</h3>
      <Calendar
        onChange={handleDateChange}
        value={date}
        nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
        prevLabel={<FontAwesomeIcon icon={faArrowLeft} />}
        tileDisabled={tileDisabled}
        tileContent={tileContent}
        navigationLabel={({ date, label, locale, view }) => 
          view === 'month' && `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
        }
        prev2Label={null}
        next2Label={null}
        onActiveStartDateChange={handleActiveStartDateChange}
        activeStartDate={currentMonth} // Add this line to keep track of the current month
      />
    </div>
  );
};

export default CalendarComponent;
