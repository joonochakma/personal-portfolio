'use client';

import { useEffect, useState } from 'react';
import LightIcon from './icons/light-Icon';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // default to dark mode

  useEffect(() => {
    // Apply dark mode by default unless saved preference is 'light'
    const savedTheme = localStorage.getItem('theme');
    const shouldUseDark = savedTheme !== 'light';
    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center  justify-center w-10 h-10 p-2 bg-white dark:bg-black hover:opacity-70 transition-opacity "
    >
      <LightIcon colour={isDarkMode ? '#fff' : '#000'} />
    </button>
  );
};

export default ThemeToggle;
