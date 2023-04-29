import React, { FC, useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeContext, defaultContext } from './utils/ThemeContext';
import './App.scss';
import { AppRouter } from './components/AppRouter';
import { store } from './store';

export const App: FC = () => {

  const [theme, setTheme] = useState(defaultContext.theme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={
      {
        theme,
        toggleTheme,
      }
    }>
    <Provider store={store}>
        <AppRouter/>
    </Provider>
    </ThemeContext.Provider>
  );
};