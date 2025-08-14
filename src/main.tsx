import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './index.css';

import './demos/ipc';
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');
