import React, { useState } from 'react';
import styles from '../styles/componentStyles.module.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (username && password) {
      //API for 0Auth
    } else {
      setError('Please enter both a username and a password.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className={styles['centered-heading']}>Login</h1>
        {error && <div className="error-message">{error}</div>}
        <div className={styles['centered-element2']}>
          <label htmlFor="username">Username:&nbsp;&nbsp;</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles['centered-element2']}>
          <label htmlFor="password">Password:&nbsp;&nbsp;</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br></br>
        <button type="submit" style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
        }}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
