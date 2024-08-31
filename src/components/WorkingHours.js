import React, { useState, useEffect } from 'react';
import styles from '../style/WorkingHours.module.css';
import Loader from './Loader';
import ConfirmationPopup from './ConfirmationPopup';
import { getWorkingHours, updateWorkingHours } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const daysOfWeek = [
  {key: "Sunday", value: "ראשון"},
  {key: "Monday", value: "שני"},
  {key: "Tuesday", value: "שלישי"},
  {key: "Wednesday", value: "רביעי"},
  {key: "Thursday", value: "חמישי"},
  {key: "Friday", value: "שישי"},
  {key: "Saturday", value: "שבת"},
];

function WorkingHours() {
  const [workingHours, setWorkingHours] = useState([]);
  const [expandedDays, setExpandedDays] = useState({});
  const [saveEnabledDays, setSaveEnabledDays] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectDay, setSelectDay] = useState();

  useEffect(() => {
    getWorkingHours()
      .then(response => {
        setWorkingHours(response.data)
        setIsLoading(false);
      })
      .catch(e => console.error(e));
  }, []);

  const handleConfirm = () => {
    
    if (saveEnabledDays[selectDay]) {
      const updatedDay = workingHours.find(h => h.dayOfWeek === selectDay);
  
      // Call your API to update the specific day
      updateWorkingHours(updatedDay).then(response => {
        console.log(`Working hours updated for ${selectDay}`);
        setSaveEnabledDays(prevState => ({
          ...prevState,
          [selectDay]: false, // Disable the save button after saving
        }));
      }).catch(e => console.error(e));
    }

    setSelectDay();
    setShowPopup(false);
  };

  const handleCancel = () => {
    setSelectDay();
    setShowPopup(false);
  };

  const toggleDay = (dayOfWeek) => {
    if (workingHours.some(wh => wh.dayOfWeek === dayOfWeek)) {
      setExpandedDays(prevState => ({
        ...prevState,
        [dayOfWeek]: !prevState[dayOfWeek],
      }));
    }
  };

  const handleTimeChange = (day, type, value) => {
    setWorkingHours(prevHours =>
      prevHours.map(h => (h.dayOfWeek === day ? { ...h, [type]: value } : h))
    );

    // Enable the save button for this specific day
    setSaveEnabledDays(prevState => ({
      ...prevState,
      [day]: true,
    }));
  };

  const handleSave = (day) => {
    setSelectDay(day);
    setShowPopup(true);
  };

  return (
    <div className={styles.container}>
      {isLoading ?
        <Loader />
      :
        <>
          {daysOfWeek.map(({ key, value }) => {
            const workingHour = workingHours.find(wh => wh.dayOfWeek === key);
            const isDayClickable = !!workingHour;

            return (
              <div key={key} className={styles.day} dir='rtl'>
                <div
                  className={`${styles.dayHeader} ${isDayClickable ? '' : styles.disabled}`}
                  onClick={() => isDayClickable && toggleDay(key)}
                >
                  <label className={styles.label}>{value}</label>
                  {isDayClickable && (
                    <FontAwesomeIcon
                      icon={expandedDays[key] ? faChevronUp : faChevronDown}
                      className={styles.arrow}
                    />
                  )}
                </div>
                {isDayClickable && expandedDays[key] && (
                  <div className={styles.timePickerContainer} >
                    <TimePicker
                      value={workingHour.startTime}
                      onChange={(value) => handleTimeChange(key, 'startTime', value)}
                      className={styles.select}
                      clearIcon={null}
                      format="HH:mm"
                      disableClock={true}
                    />
                    <TimePicker
                      value={workingHour.endTime}
                      onChange={(value) => handleTimeChange(key, 'endTime', value)}
                      className={styles.select}
                      clearIcon={null}
                      format="HH:mm"
                      disableClock={true}
                    />
                    <div className={styles.buttonContainer}>
                      <button
                        onClick={() => handleSave(key)}
                        className={`${styles.saveButton} ${saveEnabledDays[key] ? styles.enabled : styles.disabled}`}
                        disabled={!saveEnabledDays[key]}
                      >
                        עדכן
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {showPopup && (
            <ConfirmationPopup
            message={`Are you sure you want to update working hours on ${daysOfWeek.find(wh => wh.key === selectDay).value}?`}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}
        </>
      }
    </div>
  );
}

export default WorkingHours;