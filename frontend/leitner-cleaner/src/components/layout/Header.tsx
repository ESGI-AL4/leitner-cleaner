import React from 'react';
import ActionButtons from '../../components/common/ActionButtons';
import './Header.css';

interface HeaderProps {
    onScheduleNotifications: () => void;
    onStartQuiz: () => void;
    onAddCard: () => void;
}

const Header: React.FC<HeaderProps> = ({
                                           onScheduleNotifications,
                                           onStartQuiz,
                                           onAddCard,
                                       }) => {
    return (
        <header className="app-header">
            <h1>Mes Cartes</h1>
            <ActionButtons
                onScheduleNotifications={onScheduleNotifications}
                onStartQuiz={onStartQuiz}
                onAddCard={onAddCard}
            />
        </header>
    );
};

export default Header;