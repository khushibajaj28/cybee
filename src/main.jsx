import React from 'react';
import { createRoot } from 'react-dom/client';
import CybeePortal from './CybeePortal';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CybeePortal />
  </React.StrictMode>
);