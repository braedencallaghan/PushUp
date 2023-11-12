// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/componentStyles.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to="/" className={styles['a']}>Home</Link>
        </li>
        <li>    
          <Link to="/login" className={styles['a']}>Login</Link>
        </li>
        {/*<li>
          <Link to="/contact">Contact</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;