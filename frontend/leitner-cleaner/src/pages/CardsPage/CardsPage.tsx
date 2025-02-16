import React from "react";
import Header from "../../components/layout/Header";
import useCards from "../../hooks/useCards";
import "./CardsPage.css";
import CardsDisplay from "../../components/cards/CardsDisplay.tsx";

const CardsPage: React.FC = () => {
    const { cards } = useCards();

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
            <Header
                onScheduleNotifications={handleScheduleNotifications}
                onStartQuiz={handleStartQuiz}
                onAddCard={handleAddCard}
            />
            <CardsDisplay cards={cards} />
        </div>
    );
};

export default CardsPage;
