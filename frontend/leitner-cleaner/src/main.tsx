import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from "./contexts/AuthProvider.tsx";
import React from 'react';

import "primereact/resources/themes/lara-light-teal/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; //flex

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </AuthProvider>,
)