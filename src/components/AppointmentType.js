import React, { useState, useEffect } from 'react';
import { getAppointmentTypes, addAppointmentType, updateAppointmentType, deleteAppointmentType } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../style/App.module.css';
import Loader from './Loader';
import ConfirmationPopup from './ConfirmationPopup';

function AppointmentType() {
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [newType, setNewType] = useState({ name: '', cost: '', time: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [actionParams, setActionParams] = useState(null); // To store different parameters

  useEffect(() => {
    getAppointmentTypes().then(response => {
      setAppointmentTypes(response.data);
      setIsLoading(false);
    });
  }, []);

  const handleConfirm = () => {
    if (actionType === 'delete') {
      const { id } = actionParams;
      // Call the delete API with itemId
      //console.log(`Confirmed: Deleting item with ID ${id}...`);
      deleteAppointmentType(id).then(response => {
        setAppointmentTypes(prevTypes => prevTypes.filter(t => t.id !== id));
      });
    } else if (actionType === 'update') {
      const { type } = actionParams;
      // Call the logout API with username
      //console.log(`Confirmed: Logging out user ${type}...`);
      updateAppointmentType(type).then(response => {
        console.log('Appointment type updated', response);
      });
    } else if(actionType === 'save') {
      addAppointmentType(newType).then(response => {
        setAppointmentTypes([...appointmentTypes, response.data]);
        setNewType({ name: '', cost: '', time: '' });
      });
    }
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const getMessage = () => {
    if (actionType === 'delete') {
      return `האם אתה בטוח שברצונך למחוק סוג זה?`;
    } else if (actionType === 'update') {
      //const { username } = actionParams;
      return `האם אתה בטוח שברצונך לעדכן סוג זה??`;
    }else if(actionType === 'save') {
      return `האם אתה בטוח שברצונך להוסיף סוג זה? ${JSON.stringify(newType)}?`;
    }
    return '';
  };

  const handleInputChange = (e, type, field) => {
    const value = e.target.value;
    if (type === 'new') {
      setNewType({ ...newType, [field]: value });
    } else {
      setAppointmentTypes(prevTypes => prevTypes.map(t => 
        t.id === type.id ? { ...t, [field]: value } : t
      ));
    }
  };

  const handleSave = () => {
    setActionType('save');
    setShowPopup(true);
  };

  const handleUpdate = (type) => {
    setActionType('update');
    setActionParams({ type }); // Store the item ID
    setShowPopup(true);
  };

  const handleDelete = (id) => {
    setActionType('delete');
    setActionParams({ id }); // Store the item ID
    setShowPopup(true);
  };

  return (
    <div>
      <h3 dir='rtl'>סוגי פגישות</h3>
      {isLoading ?
        <Loader />
      :
        <>
          <div>
            {appointmentTypes.map(type => (
              <div key={type.id} className={styles.appointmentTypeRow}>
                <div className={styles.appointmentTypeCell}>
                  <input type="text" value={type.name} onChange={(e) => handleInputChange(e, type, 'name')} />
                </div>
                <div className={styles.appointmentTypeCell}>
                  <input type="text" value={type.cost} onChange={(e) => handleInputChange(e, type, 'cost')} />
                </div>
                <div className={styles.appointmentTypeCell}>
                  <input type="text" value={type.time} onChange={(e) => handleInputChange(e, type, 'time')} />
                </div>
                <div className={styles.appointmentTypeCell}>
                  <button onClick={() => handleUpdate(type)} style={{color: "white", backgroundColor: "rgb(0 152 255)"}}>
                    <FontAwesomeIcon icon="fa-solid fa-upload" />
                  </button>
                </div>
                <div className={styles.appointmentTypeCell}>
                  <button onClick={() => handleDelete(type.id)}>
                    <FontAwesomeIcon icon=" fa fa-trash"/>
                  </button>
                </div> 
              </div>
            ))}
          </div>
          <div dir='rtl'>
            <h3>הוסף סוג תור חדש</h3>
            <div className={styles.appointmentTypeRow}>
              <div className={styles.appointmentTypeCell}>
                <input type="text" placeholder="שם" value={newType.name} onChange={(e) => handleInputChange(e, 'new', 'name')} />
              </div>
              <div className={styles.appointmentTypeCell}>
                <input type="text" placeholder="מחיר" value={newType.cost} onChange={(e) => handleInputChange(e, 'new', 'cost')} />
              </div>
              <div className={styles.appointmentTypeCell}>
                <input type="text" placeholder="זמן" value={newType.time} onChange={(e) => handleInputChange(e, 'new', 'time')} />
              </div>
              <div className={styles.appointmentTypeCell}>
                <button onClick={handleSave} style={{color: "white", backgroundColor: "#4caf50"}}>הוסף</button>
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

export default AppointmentType;
