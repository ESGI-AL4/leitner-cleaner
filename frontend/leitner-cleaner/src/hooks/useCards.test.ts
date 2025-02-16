import { useCards } from './useCards';
import { vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

// Données factices pour nos tests
const dummyCards = [
    {
        id: "1",
        category: "1",
        question: "What is pair programming?",
        answer: "A practice to work in pair on same computer.",
        tag: "Teamwork",
    },
    {
        id: "2",
        category: "2",
        question: "What is 2+2?",
        answer: "4",
        tag: "Math",
    },
];

// Simuler la variable d'environnement pour Vite
Object.defineProperty(import.meta, 'env', {
    value: {
        VITE_BACK_URL: 'http://localhost:8080',
    },
});

describe('useCards hook', () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        global.fetch = originalFetch;
        vi.clearAllMocks();
    });

    test('fetches cards successfully', async () => {
        // Simuler un appel fetch réussi
        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => dummyCards,
        });

        const { result } = renderHook(() => useCards());

        // Vérifier l'état initial
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBe(null);
        expect(result.current.cards).toEqual([]);

        // Attendre que le chargement se termine
        await waitFor(() => !result.current.loading);

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
        expect(result.current.cards).toEqual(dummyCards);
    });

    test('handles error when response is not ok', async () => {
        // Simuler un fetch dont la réponse n'est pas OK
        (global.fetch as any).mockResolvedValueOnce({
            ok: false,
            json: async () => ({}),
        });

        const { result } = renderHook(() => useCards());
        await waitFor(() => !result.current.loading);

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('Failed to fetch cards');
        expect(result.current.cards).toEqual([]);
    });

    test('handles network error', async () => {
        // Simuler un rejet de l'appel fetch (erreur réseau)
        (global.fetch as any).mockRejectedValueOnce(new Error('Network Error'));

        const { result } = renderHook(() => useCards());
        await waitFor(() => !result.current.loading);

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('Network Error');
        expect(result.current.cards).toEqual([]);
    });
});
