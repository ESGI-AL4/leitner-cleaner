
import { useQuiz } from './useQuiz';
import { vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';

describe('useQuiz hook', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('devrait récupérer les cartes avec succès', async () => {
        const dummyCards = [
            { id: '1', question: 'Q1', answer: 'A1', category: 'Cat1', tag: 'Tag1' },
            { id: '2', question: 'Q2', answer: 'A2', category: 'Cat2', tag: 'Tag2' },
        ];

        const fetchMock = vi.spyOn(global, 'fetch');
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(dummyCards),
        } as unknown as Response);

        const { result } = renderHook(() => useQuiz('2025-02-16'));

        // On attend que le chargement soit terminé
        await waitFor(() => !result.current.loading);

        expect(result.current.currentCard).toEqual(dummyCards[0]);
        expect(result.current.totalCards).toEqual(dummyCards.length);
        expect(result.current.currentQuestionNumber).toEqual(1);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    it('devrait gérer une erreur lors de la récupération des cartes', async () => {
        const fetchMock = vi.spyOn(global, 'fetch');
        fetchMock.mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve({}),
        } as unknown as Response);

        const { result } = renderHook(() => useQuiz('2025-02-16'));

        await waitFor(() => !result.current.loading);

        expect(result.current.error).toContain('Failed to fetch cards');
        expect(result.current.totalCards).toEqual(0);
        expect(result.current.currentCard).toBeNull();
    });

    it('devrait rendre la réponse visible lorsque showAnswer est appelée', async () => {
        const dummyCards = [
            { id: '1', question: 'Q1', answer: 'A1', category: 'Cat1', tag: 'Tag1' },
        ];
        const fetchMock = vi.spyOn(global, 'fetch');
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(dummyCards),
        } as unknown as Response);

        const { result } = renderHook(() => useQuiz('2025-02-16'));

        await waitFor(() => !result.current.loading);

        act(() => {
            result.current.showAnswer();
        });

        expect(result.current.isAnswerVisible).toBe(true);
    });

    it('devrait évaluer la réponse et passer à la carte suivante en cas de succès (si ce n\'est pas la dernière carte)', async () => {
        const dummyCards = [
            { id: '1', question: 'Q1', answer: 'A1', category: 'Cat1', tag: 'Tag1' },
            { id: '2', question: 'Q2', answer: 'A2', category: 'Cat2', tag: 'Tag2' },
        ];
        const fetchMock = vi.spyOn(global, 'fetch');
        // Premier appel : récupération des cartes
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(dummyCards),
        } as unknown as Response);
        // Deuxième appel : évaluation de la réponse
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({}),
        } as unknown as Response);

        const { result } = renderHook(() => useQuiz('2025-02-16'));

        await waitFor(() => !result.current.loading);

        // Vérification de l'état initial
        expect(result.current.currentCard).toEqual(dummyCards[0]);
        expect(result.current.correctAnswers).toEqual(0);

        await act(async () => {
            await result.current.evaluateAnswer(true);
        });

        // Après évaluation, puisque ce n'était pas la dernière carte :
        expect(result.current.correctAnswers).toEqual(1);
        expect(result.current.currentCard).toEqual(dummyCards[1]);
        expect(result.current.currentQuestionNumber).toEqual(2);
        expect(result.current.isAnswerVisible).toBe(false);
        expect(result.current.isQuizComplete).toBe(false);
    });

    it('devrait marquer le quiz comme terminé lors de l\'évaluation sur la dernière carte', async () => {
        const dummyCards = [
            { id: '1', question: 'Q1', answer: 'A1', category: 'Cat1', tag: 'Tag1' },
        ];
        const fetchMock = vi.spyOn(global, 'fetch');
        // Premier appel : récupération de la carte unique
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(dummyCards),
        } as unknown as Response);
        // Deuxième appel : évaluation de la réponse
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({}),
        } as unknown as Response);

        const { result } = renderHook(() => useQuiz('2025-02-16'));

        await waitFor(() => !result.current.loading);

        expect(result.current.currentCard).toEqual(dummyCards[0]);
        expect(result.current.isQuizComplete).toBe(false);

        await act(async () => {
            await result.current.evaluateAnswer(true);
        });

        // Puisqu'il s'agissait de la dernière carte, le quiz doit être marqué comme terminé
        expect(result.current.correctAnswers).toEqual(1);
        expect(result.current.isQuizComplete).toBe(true);
        expect(result.current.currentQuestionNumber).toEqual(1);
    });
});
