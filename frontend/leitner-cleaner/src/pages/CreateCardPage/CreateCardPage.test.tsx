import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateCardPage from './CreateCardPage';
import { createCard } from '../../infrastructure/api/CardRepository';
import { vi } from 'vitest';

// On simule le module CardRepository
vi.mock('../../infrastructure/api/CardRepository', () => ({
    createCard: vi.fn(),
}));

describe('CreateCardPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders form fields and button', () => {
        render(<CreateCardPage />);
        expect(screen.getByLabelText(/question/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/réponse/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/tag/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /créer la fiche/i })).toBeInTheDocument();
    });

    test('shows error when mandatory fields are empty', () => {
        render(<CreateCardPage />);
        const button = screen.getByRole('button', { name: /créer la fiche/i });
        fireEvent.click(button);
        expect(screen.getByText(/la question, la réponse et le tag sont requises/i)).toBeInTheDocument();
    });

    test('calls createCard and displays success when form is valid', async () => {
        // Simulation d'une réponse réussie de l'API
        (createCard as any).mockResolvedValue({
            id: "123",
            category: "FIRST",
            question: "What is React?",
            answer: "A library for building UIs.",
            tag: "Frontend"
        });

        render(<CreateCardPage />);

        const questionInput = screen.getByLabelText(/question/i);
        const answerInput = screen.getByLabelText(/réponse/i);
        const tagInput = screen.getByLabelText(/tag/i);
        const button = screen.getByRole('button', { name: /créer la fiche/i });

        fireEvent.change(questionInput, { target: { value: "What is React?" } });
        fireEvent.change(answerInput, { target: { value: "A library for building UIs." } });
        fireEvent.change(tagInput, { target: { value: "Frontend" } });
        fireEvent.click(button);

        // Vérifier que createCard a été appelé avec les bonnes données
        await waitFor(() => {
            expect(createCard).toHaveBeenCalledWith({
                question: "What is React?",
                answer: "A library for building UIs.",
                tag: "Frontend"
            });
        });

        // Vérifier que le message de succès est affiché
        await waitFor(() => {
            expect(screen.getByText(/carte créée avec succès/i)).toBeInTheDocument();
        });

        // Vérifier que les champs sont réinitialisés
        expect(questionInput).toHaveValue('');
        expect(answerInput).toHaveValue('');
        expect(tagInput).toHaveValue('');
    });

    test('displays error message when createCard fails', async () => {
        (createCard as any).mockRejectedValue(new Error("Network Error"));

        render(<CreateCardPage />);

        const questionInput = screen.getByLabelText(/question/i);
        const answerInput = screen.getByLabelText(/réponse/i);
        const tagInput = screen.getByLabelText(/tag/i);
        const button = screen.getByRole('button', { name: /créer la fiche/i });

        fireEvent.change(questionInput, { target: { value: "What is React?" } });
        fireEvent.change(answerInput, { target: { value: "A library for building UIs." } });
        fireEvent.change(tagInput, { target: { value: "Frontend" } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/erreur lors de la création de la carte/i)).toBeInTheDocument();
        });
    });
});
