import React from 'react';
import styles from '../style/App.module.css';

function Options({ setView }) {

  const options = [
    { text: "תורים", value: "appointments" },
    { text: "תורים מבוטלים", value: "canceledAppointments" },
    { text: "סוג פגישות", value: "appointmentType" },
    { text: "חופשים", value: "vacation" },
    { text: "שעות העבודה", value: "workingHours" },
    { text: "ימי חופש", value: "dayOff" },
  ];

  return (
    <>
      {options.map((option, index) => (
        <div key={index} className={styles.option} onClick={() => setView(option.value)}>
          <div className={styles.optionText}>{option.text}</div>
          <i className={styles.optionIcon + "fa fa-star"}></i>
        </div>
      ))}
    </>
  );
}

export default Options;
