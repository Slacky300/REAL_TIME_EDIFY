import React, { useState, useEffect } from 'react';
import styles from './DarkModeButton.module.css';

const DarkModeButton = () => {
  // Retrieve the saved theme preference from localStorage, default to 'light'
  const savedTheme = localStorage.getItem('theme') || 'light';
  // Set the initial state based on the saved theme
  const [darkMode, setDarkMode] = useState(savedTheme === 'dark');

  useEffect(() => {
    const htmlElement = document.documentElement;

    // Update the data-bs-theme attribute based on the current theme
    htmlElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');

    // Update the body's classes based on the current theme
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-white');
      document.body.classList.remove('bg-light', 'text-dark');
    } else {
      document.body.classList.add('bg-light', 'text-dark');
      document.body.classList.remove('bg-dark', 'text-white');
    }

    // Save the current theme preference to localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]); // Re-run effect when darkMode changes

  // Toggle the darkMode state
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={styles.switchContainer}>
      <h1 style={{ fontWeight: '400', fontSize: '1rem', paddingTop: '0.5rem', paddingRight: '0.5rem' }}>
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </h1>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggleDarkMode}
          className={styles.checkbox}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default DarkModeButton;
