import axios from 'axios';
import { createCard } from './CardRepository';
import type { CardType } from '../../components/cards/CardItem';
import { describe, test, expect, vi } from 'vitest';

vi.mock('axios');

describe('createCard', () => {
    test('should create a card and return data', async () => {
        const cardRequest = {
            question: "What is pair programming?",
            answer: "A practice to work in pair on same computer.",
            tag: "Teamwork"
        };

        const cardResponse: CardType = {
            id: "6c10ad48-2bb8-4e2e-900a-21d62c00c07b",
            category: "FIRST",
            question: "What is pair programming?",
            answer: "A practice to work in pair on same computer.",
            tag: "Teamwork"
        };

        // Simuler une réponse axios réussie
        (axios.post as any).mockResolvedValue({ data: cardResponse });

        const result = await createCard(cardRequest);

        // Vérifier que axios.post a été appelé correctement
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3000/cards',
            cardRequest,
            { headers: { 'Content-Type': 'application/json' } }
        );
        // Vérifier que le résultat correspond à la réponse simulée
        expect(result).toEqual(cardResponse);
    });

    test('should throw error if API fails', async () => {
        const cardRequest = {
            question: "What is pair programming?",
            answer: "A practice to work in pair on same computer.",
            tag: "Teamwork"
        };

        const error = new Error("Network Error");
        (axios.post as any).mockRejectedValue(error);

        await expect(createCard(cardRequest)).rejects.toThrow("Network Error");
    });
});