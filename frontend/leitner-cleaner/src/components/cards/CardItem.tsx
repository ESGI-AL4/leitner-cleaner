import React from 'react';
import { Card } from 'primereact/card';

export interface CardType {
    id: string;
    category: string;
    question: string;
    answer: string;
    tag?: string;
}

interface CardItemProps {
    card: CardType;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
    return (
        <Card title={card.question} className="card-item">
            <p>{card.answer}</p>
            <p>Catégorie : {card.category}</p>
            {card.tag && <p>Tag : {card.tag}</p>}
        </Card>
    );
};

export default CardItem;