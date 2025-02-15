import React from 'react';
import { Button } from 'primereact/button';

interface ActionButtonsProps {
    onScheduleNotifications: () => void;
    onStartQuiz: () => void;
    onAddCard: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onScheduleNotifications, onStartQuiz, onAddCard }) => {
    return (
        <div className="action-buttons">
            <Button label="Régler l'heure des notifications" icon="pi pi-clock" className="p-mr-2" onClick={onScheduleNotifications} />
            <Button label="Lancer le quiz" icon="pi pi-play" className="p-mr-2" onClick={onStartQuiz} />
            <Button label="Ajouter une carte" icon="pi pi-plus" onClick={onAddCard} />
        </div>
    );
};

export default ActionButtons;
