import React, { useEffect } from 'react';
import styles from './DarkModeButton.module.css';
import { useSupplier } from '../../context/supplierContext';

const DarkModeButton = () => {
  // Load the saved theme from localStorage or default to 'light'
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Destructure darkMode and setDarkMode from useSupplier hook
  const { darkMode, setDarkMode } = useSupplier(savedTheme === 'dark');

  useEffect(() => {
    const htmlElement = document.documentElement;

    // Set the attribute for Bootstrap theme
    htmlElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');

    // Toggle body's classes for background and text colors
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-white');
      document.body.classList.remove('bg-light', 'text-dark');
    } else {
      document.body.classList.add('bg-light', 'text-dark');
      document.body.classList.remove('bg-dark', 'text-white');
    }

    // Save the current theme preference to localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

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
