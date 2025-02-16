
import { useCards } from './useCards';
import { vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

describe('useCards hook', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('devrait récupérer les cartes avec succès', async () => {
        const fakeCards = [
            { id: '1', question: 'Question 1', answer: 'Réponse 1', category: 'Cat1', tag: 'Tag1' },
            { id: '2', question: 'Question 2', answer: 'Réponse 2', category: 'Cat2', tag: 'Tag2' },
        ];

        // On simule que fetch renvoie une réponse dont la méthode json() retourne fakeCards
        vi.spyOn(global, 'fetch').mockResolvedValue({
            json: () => Promise.resolve(fakeCards),
        } as unknown as Response);

        const { result } = renderHook(() => useCards());

        // On attend que loading devienne false
        await waitFor(() => !result.current.loading);

        expect(result.current.cards).toEqual(fakeCards);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });
});
