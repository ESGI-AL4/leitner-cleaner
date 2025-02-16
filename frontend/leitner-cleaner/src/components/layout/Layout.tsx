// src/components/Layout.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    // Ouvre une popup pour saisir l'heure et simuler la programmation d'une notif
    const handleScheduleNotifications = () => {
        const time = window.prompt("Veuillez saisir l'heure (HH:MM) pour la notification du quiz du jour:");
        if (time) {
            console.log(`Notification programmée à ${time}`);
            // Ici, vous pouvez appeler une API ou programmer un timer
        }
    };

    // Navigation vers la page des cartes
    const handleAllCards = () => {
        navigate('/cards');
    };

    // Navigation vers la page du quiz
    const handleStartQuiz = () => {
        navigate('/quiz');
    };

    // Navigation vers la page de création de carte
    const handleAddCard = () => {
        navigate('/create-card');
    };

    return (
        <div className="app-layout">
            <Header
                onScheduleNotifications={handleScheduleNotifications}
                onAllCards={handleAllCards}
                onStartQuiz={handleStartQuiz}
                onAddCard={handleAddCard}
            />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
