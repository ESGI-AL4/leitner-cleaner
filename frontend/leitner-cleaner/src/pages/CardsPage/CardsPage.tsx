import React, { useState, useEffect } from 'react';
import CardList from '../../components/cards/CardList';
import ActionButtons from '../../components/common/ActionButtons';
import { CardType } from '../../components/cards/CardItem';
import './CardsPage.css';

const CardsPage: React.FC = () => {
    const [cards, setCards] = useState<CardType[]>([]);

    useEffect(() => {
        // Données factices incluant la carte fournie
        const dummyCards: CardType[] = [
            {
                id: "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
                category: "FIRST",
                question: "What is pair programming ?",
                answer: "A practice to work in pair on same computer.",
                tag: "Teamwork"
            },
            {
                id: "2",
                category: "SECOND",
                question: "What is 2+2 ?",
                answer: "4",
                tag: "Math"
            }
        ];
        setCards(dummyCards);
    }, []);

    const handleScheduleNotifications = () => {
        console.log("Régler l'heure des notifications");
    };

    const handleStartQuiz = () => {
        console.log("Lancer le quiz");
    };

    const handleAddCard = () => {
        console.log("Ajouter une carte");
    };

    return (
        <div className="cards-page">
            <h1>Mes Cartes</h1>
            <CardList cards={cards} />
            <ActionButtons
                onScheduleNotifications={handleScheduleNotifications}
                onStartQuiz={handleStartQuiz}
                onAddCard={handleAddCard}
            />
        </div>
    );
};

export default CardsPage;