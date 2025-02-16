// src/pages/LoginPage/LoginPage.tsx
import React, { useState, useContext } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { AuthContext } from '../../contexts/AuthContext.ts';
import './LoginPage.css';
import { FloatLabel } from "primereact/floatlabel";
import { useNavigate } from 'react-router-dom';


const LoginPage: React.FC = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialisez le hook

    const handleLogin = () => {
        if (!username.trim() || !password.trim()) {
            setError('Username and password are required');
            return;
        }
        setError('');
        // Appel de la fonction fake de login depuis le contexte
        login(username);
        navigate('/cards');
    };

    return (
        <div className="login-page">
            <Card title="Connexion" className="login-card">
                <div className="card justify-content-center p-field">
                    <FloatLabel>
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </FloatLabel>
                </div>
                <div className="card justify-content-center p-field">
                    <FloatLabel>
                        <Password inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                    </FloatLabel>
                </div>
                <div className="">
                    <div className="error-container">
                        {error && <small className="p-error">{error}</small>}
                    </div>
                    <Button label="Se connecter" icon="pi pi-sign-in" onClick={handleLogin} className="p-mt-2" />
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
