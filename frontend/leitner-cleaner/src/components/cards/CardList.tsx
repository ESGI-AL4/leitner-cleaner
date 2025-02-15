import React from 'react';
import CardItem, { CardType } from './CardItem';

interface CardListProps {
    cards: CardType[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
    return (
        <div className="cards-list">
            {cards.map((card) => (
                <CardItem key={card.id} card={card} />
            ))}
        </div>
    );
};

export default CardList;