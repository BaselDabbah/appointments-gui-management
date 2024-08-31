import React, { useState, useEffect } from 'react';
import { getDaysOff, addDayOff, deleteDayOff } from '../services/api';
import Loader from './Loader';
import ConfirmationPopup from './ConfirmationPopup';
import styles from '../style/App.module.css';

const daysOfWeek = [
  {key:"Sunday", value: "ראשון"},
  {key:"Monday", value: "שני"},
  {key:"Tuesday", value: "שלישי"},
  {key:"Wednesday", value: "רביעי"},
  {key:"Thursday", value: "חמישי"},
  {key:"Friday", value: "שישי"},
  {key:"Saturday", value: "שבת"},
]

function DayOff() {
  const [daysOff, setDaysOff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectDay, setSelectDay] = useState();

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const responseDaysOff = await getDaysOff();
        if(responseDaysOff){
          setDaysOff(responseDaysOff.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, []);

  const handleConfirm = async() => {
    
    if(daysOff.includes(selectDay)){
      const response = await deleteDayOff(selectDay);
      
      if(response)
        setDaysOff(daysOff.filter(d => selectDay !== d));
    }else{
      const response = await addDayOff(selectDay);

      if(response)
        setDaysOff([...daysOff, selectDay])
    }

    setSelectDay();
    setShowPopup(false);
  };

  const handleCancel = () => {
    setSelectDay();
    setShowPopup(false);
  };

  const handleCheckboxChange = (day) => {
    setSelectDay(day);
    setShowPopup(true);
  };

  /*const handleSave = () => {
    updateDayOff(daysOff).then(response => {
      console.log('Days off updated', response);
    });
  };*/

  return (
    <div>
      {isLoading ?
        <Loader />
      :
        <>
          {daysOfWeek.map(day => (
            <div key={day.key} className={styles.option}>
              <label>
                <input 
                  type="checkbox" 
                  checked={daysOff.includes(day.key)} 
                  onChange={() => handleCheckboxChange(day.key)} 
                />
                {day.value}
              </label>
            </div>
          ))}
          {/*<button onClick={handleSave} className={styles.button}>Save</button>*/}
          {showPopup && (
            <ConfirmationPopup
            message={`האם אתה בטוח שברצונך  ${daysOff.includes(selectDay)? "למחוק":"להוסיף"} יום ${daysOfWeek.find(day => day.key === selectDay).value} לימי חופש?`}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}
        </>
      }
    </div>
  );
}

export default DayOff;
