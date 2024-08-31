// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DayOff from './components/DayOff';
import WorkingHours from './components/WorkingHours';
import AppointmentType from './components/AppointmentType';
import Vacation from './components/Vacation';
import Appointments from './components/Appointments';
import Options from './components/Options';
import StaticCard from './components/StaticCard';
import Calendar from './components/Calendar';
import Login from './components/Login';
import ProtectedRoute from './middleware/ProtectedRoute';
import styles from './style/App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDispatch, useSelector } from 'react-redux';
import { clearToken, setToken  } from './conf/slices/authSlice';

function App() {
  const [view, setView] = useState(''); // Default view
  const [date, setDate] = useState();
  const [appointmentView, setappointmentView] = useState('');
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token); // Select token from Redux state

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if(appointmentView)
      setView('appointmentsView');
  },[appointmentView])

  

  const handleLogout = () => {
    dispatch(clearToken()); // Clear the token
    window.location.href = '/login'; // Redirect to login page
    localStorage.removeItem("authToken");
  };

  const renderView = () => {
    console.log(view);
    switch (view) {
      case 'dayOff':
        return <DayOff />;
      case 'workingHours':
        return <WorkingHours />;
      case 'appointmentType':
        return <AppointmentType />;
      case 'vacation':
        return <Vacation />;
      case 'appointmentsView':
        return <Appointments date={date} appointmentView={appointmentView} />;
      case 'appointments':
      case 'canceledAppointments':
        return <Calendar handleDateSelect={setDate} view={view} setappointmentView={setappointmentView}/>;
      default:
        return <Options setView={setView} />;
    }
  };

  const handleBackButton = () => {
    if (view === 'appointmentsView') {
      setView(appointmentView);
      setappointmentView('');
    }
    else setView('');
  };

  return (
    <Router>
      <div className={styles.container}>
      {token && <StaticCard />}
        <div className={styles.options}>
          {view && (
            <div
              id="closeDatePicker"
              className={styles.backButton}
              onClick={handleBackButton}
            >
              <FontAwesomeIcon icon="fa-solid fa-angle-left" />
              <span> </span>חזרה
            </div>
          )}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  {renderView()}
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        {token && <button onClick={handleLogout} className={styles.logoutButton}>
          התנתק 
        </button>}
      </div>
    </Router>
  );
}

export default App;
