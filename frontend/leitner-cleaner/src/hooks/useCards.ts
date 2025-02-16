import { useState, useEffect } from 'react';
import { Card } from '../domain/entities/Card';

export const useCards = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const backUrl = import.meta.env.VITE_BACK_URL;

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`${backUrl}/cards`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch cards');
                }
                const data = await response.json();
                setCards(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching cards');
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [backUrl]);

    return { cards, loading, error };
};
