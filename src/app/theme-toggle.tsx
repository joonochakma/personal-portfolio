'use client';

import React, { useEffect, useState } from 'react';
import LightIcon from './icons/light-Icon'; // Adjust the path as needed

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem('theme') !== 'light'
  );

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    // Apply the saved theme on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
    >
      <LightIcon colour={isDarkMode ? '#fff' : '#000'} />
    </button>
  );
};

export default ThemeToggle;
