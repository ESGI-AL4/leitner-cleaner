import { useState, useEffect } from 'react';
import { Card } from '../domain/entities/Card';

export const useQuiz = () => {
    const [currentCard, setCurrentCard] = useState<Card | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCard = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('http://localhost:3000/cards');
            if (!response.ok) {
                throw new Error('Failed to fetch cards');
            }
            const cards: Card[] = await response.json();
            setCurrentCard(cards[0] || null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch cards');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCard();
    }, []);

    return { currentCard, loading, error, fetchCard };
};
