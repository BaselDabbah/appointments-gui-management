// src/components/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../conf/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import styles from '../style/App.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Replace with your login API call
    await login({ username, password })
      .then(response => {
        dispatch(setToken(response.data.token));
        localStorage.setItem('authToken', response.data.token); // Store token in localStorage
        navigate('/'); // Redirect to the home page or wherever appropriate
      })
      .catch(e => console.error(e));
  };

  return (
    <div dir='rtl'>
      <h2>כניסה</h2>
      <form onSubmit={handleLogin}>
        <input
            className={styles.inputField}
            type="text"
            placeholder="שם משתמש"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        <input
            className={styles.inputField}
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button className={styles.button} type="submit">התחבר</button>
      </form>
    </div>
  );
}

export default Login;
