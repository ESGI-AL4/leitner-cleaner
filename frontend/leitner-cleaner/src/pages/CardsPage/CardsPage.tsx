import React from "react";
import {useCards} from "../../hooks/useCards";
import "./CardsPage.css";
import CardsDisplay from "../../components/cards/CardsDisplay.tsx";

const CardsPage: React.FC = () => {
    const { cards } = useCards();

    return (
        <div className="cards-page">
            <h1>Mes Cartes</h1>
            <CardsDisplay cards={cards} />
        </div>
    );
};

export default CardsPage;
