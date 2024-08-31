import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import ConfirmationPopup from './ConfirmationPopup';
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getVacations, addVacation, updateVacation, deleteVacation } from '../services/api';
import styles from '../style/App.module.css';

import "react-datepicker/dist/react-datepicker.css";

function Vacation() {
  const [vacations, setVacations] = useState([]);
  const [newVacation, setNewVacation] = useState({ start: '', end: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [actionParams, setActionParams] = useState(null); // To store different parameters

  useEffect(() => {
    getVacations().then(response => {
      setVacations(response.data);
      setIsLoading(false);
    });
  }, []);

  const handleConfirm = () => {
    if (actionType === 'delete') {
      const { id } = actionParams;
      // Call the delete API with itemId
      //console.log(`Confirmed: Deleting item with ID ${id}...`);
      deleteVacation(id).then(response => {
        setVacations(prevVacations => prevVacations.filter(v => v.id !== id));
      });
    } else if (actionType === 'update') {
      const { vacation } = actionParams;
      // Call the logout API with username
      //console.log(`Confirmed: Logging out user ${vacation}...`);
      updateVacation(vacation).then(response => {
        console.log('Vacation updated', response);
      });
    } else if(actionType === 'save') {
      addVacation(newVacation).then(response => {
        setVacations([...vacations, response.data]);
        setNewVacation({ start: '', end: '' });
      });
    }
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const getMessage = () => {
    if (actionType === 'delete') {
      return `Are you sure you want to delete the Appointment?`;
    } else if (actionType === 'update') {
      //const { username } = actionParams;
      return `Are you sure you want to update the Appointment?`;
    }else if(actionType === 'save') {
      return `Are you sure you want to update the Appointment ${JSON.stringify(newVacation)}?`;
    }
    return '';
  };

  const handleDateChange = (e, vacation, field) => {
    const value = e;
    if (vacation === 'new') {
      setNewVacation({ ...newVacation, [field]: value });
    } else {
      setVacations(prevVacations => prevVacations.map(v => 
        v.id === vacation.id ? { ...v, [field]: value } : v
      ));
    }
  };

  const handleSave = () => {
    setActionType('save');
    setShowPopup(true);
  };

  const handleUpdate = (vacation) => {
    setActionType('update');
    setActionParams({ vacation }); // Store the item ID
    setShowPopup(true);
  };

  const handleDelete = (id) => {
    setActionType('delete');
    setActionParams({ id }); // Store the item ID
    setShowPopup(true);
  };

  return (
    <div style={{minHeight:"300px"}}>
      <h3 dir='rtl'>חופשים</h3>
      {isLoading ?
        <Loader />
      :
        <>
          <div >
            {vacations.map(vacation => (
              <div key={vacation.id} className={styles.appointmentTypeRow}>
                <div className={styles.appointmentVacationCell}>
                  <DatePicker selected={vacation.startDate} onChange={(e) => handleDateChange(e, vacation, 'startDate')} />
                </div>
                <div className={styles.appointmentVacationCell}>
                  <DatePicker selected={vacation.endDate} onChange={(e) => handleDateChange(e, vacation, 'endDate')} />
                </div>
                <div className={`${styles.appointmentVacationCell} ${styles.appointmentVacationButtonCell}`}>
                  <button onClick={() => handleUpdate(vacation)} style={{backgroundColor: "rgb(0, 152, 255)"}}>
                    <FontAwesomeIcon icon="fa-solid fa-upload" />
                  </button>
                </div>
                <div className={`${styles.appointmentVacationCell} ${styles.appointmentVacationButtonCell}`}>
                  <button onClick={() => handleDelete(vacation.id)} style={{backgroundColor: "#ff1100c4"}}>
                    <FontAwesomeIcon icon=" fa fa-trash"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop: "60px", direction: "rtl"}}>
            <h3>הוסף חופשה חדשה</h3>
            <div className={styles.appointmentTypeRow}>
              <div className={styles.appointmentVacationCell}>
                <DatePicker placeholder="תאריך התחלה" selected={newVacation.startDate} onChange={(e) => handleDateChange(e, 'new', 'startDate')} />
              </div>
              <div className={styles.appointmentVacationCell}>
                <DatePicker placeholder="תאריך סיום" selected={newVacation.endDate} onChange={(e) => handleDateChange(e, 'new', 'endDate')} />
              </div>
              <div className={`${styles.appointmentVacationCell} ${styles.appointmentVacationButtonCell}`}>
                <button onClick={handleSave} style={{backgroundColor: "#4caf50"}}>הוסף</button>
              </div>
            </div>
          </div>
          {showPopup && (
            <ConfirmationPopup
              message={getMessage()}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}
        </>
      }
    </div>
  );
}

export default Vacation;
