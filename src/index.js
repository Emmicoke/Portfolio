import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeContextProvider from './contexts/ThemeContext'
import { PreferencesProvider } from './i18n/Preferences'

ReactDOM.render(
    <ThemeContextProvider>
      <PreferencesProvider>
        <App />
      </PreferencesProvider>
    </ThemeContextProvider>,
  document.getElementById('root')
);

reportWebVitals();
