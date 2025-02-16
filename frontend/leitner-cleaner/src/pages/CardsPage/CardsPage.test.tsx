import { render, screen, waitFor } from '@testing-library/react';
import CardsPage from './CardsPage';
import { vi } from 'vitest';

describe('CardsPage', () => {
    const dummyCards = [
        {
            id: "1",
            category: "1",
            question: "What is pair programming?",
            answer: "A practice to work in pair on the same computer.",
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

    beforeEach(() => {
        // Simuler fetch pour qu'il retourne dummyCards
        vi.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => dummyCards,
        } as Response);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('renders title "Mes Cartes"', async () => {
        render(<CardsPage />);
        expect(screen.getByRole('heading', { name: /mes cartes/i })).toBeInTheDocument();
    });

    test('renders the CardsDisplay container', async () => {
        render(<CardsPage />);
        await waitFor(() => {
            const container = document.querySelector('.p-dataview');
            expect(container).toBeInTheDocument();
        });
    });
});
