import { useState, useEffect } from 'react';
import { Card } from '../domain/entities/Card';

export const useCards = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('http://localhost:3000/cards', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCards(data);
            } catch (err) {
                throw err instanceof Error ? err : new Error('An error occurred while fetching cards');
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    return { cards, loading, error };
};