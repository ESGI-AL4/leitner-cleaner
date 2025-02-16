import React from 'react';
import ActionButtons from '../../components/common/ActionButtons';
import './Header.css';

interface HeaderProps {
    onScheduleNotifications: () => void;
    onAllCards: () => void;
    onStartQuiz: () => void;
    onAddCard: () => void;
}

const Header: React.FC<HeaderProps> = ({
                                           onScheduleNotifications,
                                           onAllCards,
                                           onStartQuiz,
                                           onAddCard,
                                       }) => {
    return (
        <header className="app-header">
            <ActionButtons
                onScheduleNotifications={onScheduleNotifications}
                onAllCards={onAllCards}
                onStartQuiz={onStartQuiz}
                onAddCard={onAddCard}
            />
        </header>
    );
};

export default Header;
