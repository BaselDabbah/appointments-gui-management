import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAppointmentsByDate, deleteAppointment, getCanceledAppointmentsByDate } from '../services/api';
import Loader from './Loader';
import ConfirmationPopup from './ConfirmationPopup';
import styles from '../style/App.module.css';

function Appointments({date, appointmentView}) {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectId, setSelectId] = useState();
  

  const fetchAppointments = () => {
    appointmentView === 'appointments' ?
    getAppointmentsByDate(date).then(response => {
      setAppointments(response.data);
      setIsLoading(false);
    })
    :
    getCanceledAppointmentsByDate(date).then(response => {
      setAppointments(response.data);
      setIsLoading(false);
    })
  };

  const handleConfirm = () => {
    deleteAppointment(selectId).then(response => {
      setAppointments(prevAppointments => prevAppointments.filter(a => a.id !== selectId));
    });
    setSelectId();
    setShowPopup(false);
  };

  const handleCancel = () => {
    setSelectId();
    setShowPopup(false);
  };

  const handleDelete = (id) => {
    setSelectId(id);
    setShowPopup(true);
  };

  useEffect(() => {
    if (date) {
      fetchAppointments();
    }
  }, [date]);

  return (
    <div>
      {isLoading ?
        <Loader />
      :
        appointmentView === 'appointments' ?
        (
          <>
            <h3 dir='rtl'>תורים</h3>
            <div>
              {appointments.map(appointment => (
                <div key={appointment.id} className={styles.appointmentRowContainer}>
                  <div className={!appointment.note ? styles.appointmentRow : styles.appointmentDoubleRow}>
                    <div className={styles.appointmentCell}>{appointment.startTime}</div>
                    <div className={styles.appointmentCell}>{appointment.userName}</div>
                    <div className={styles.appointmentCell}>{appointment.phone}</div>
                    <div className={styles.appointmentCell}>{appointment.type}</div>
                    <div className={styles.appointmentCell} style={{width: '10%'}}>
                      <button onClick={() => handleDelete(appointment.id)}>
                        <FontAwesomeIcon icon=" fa fa-trash"/>
                      </button>
                    </div>
                  </div>
                  {appointment.note &&
                  <div className={styles.appointmentRow} style={{borderRadius: '0px 0px 5px 5px'}}>
                    <div className={styles.appointmentCell} style={{width: "100%"}}>{appointment.note}</div>
                  </div>
                  }
                </div>
              ))}
            </div>
            {showPopup && (
              <ConfirmationPopup
                message="האם אתה בטוח שברצונך למחוק התור הזה?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
          </>
        )
        :
        (
          <>
            <h3 dir='rtl'>תורים מבוטלים</h3>
            <div>
              {appointments.map(appointment => (
                <div key={appointment.id} className={styles.appointmentRowContainer}>
                  <div className={styles.appointmentDoubleRow}  >
                    <div className={styles.appointmentCell}>{appointment.date}</div>
                    <div className={styles.appointmentCell}>{appointment.startTime}</div>
                    <div className={styles.appointmentCell}>{appointment.userName}</div>
                    <div className={styles.appointmentCell}>{appointment.phone}</div>
                    <div className={styles.appointmentCell}>{appointment.type}</div>
                  </div>
                  <div className={styles.appointmentRow} style={{borderRadius: '0px 0px 5px 5px', color: appointment.canceledWithinXHours ? 'red' : ''}}>
                    <div className={styles.appointmentCell} style={{width: "100%"}}><strong>{`התור בוטל בתאריך ${appointment.canceledAt.split('T')[0]} בשעה ${appointment.canceledAt.split('T')[1].split('.')[0]}`}</strong></div>
                  </div>
                </div>
              ))}
            </div>
            {showPopup && (
              <ConfirmationPopup
                message="האם אתה בטוח שברצונך למחוק התור הזה?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
          </>
        )
      }
    </div>
  );
}

export default Appointments;
