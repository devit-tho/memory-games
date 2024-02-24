import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { MemoryProvider } from './context';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MemoryProvider>
      <App />
    </MemoryProvider>
  </React.StrictMode>,
);
