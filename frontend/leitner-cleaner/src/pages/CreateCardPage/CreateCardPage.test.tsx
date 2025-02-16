import { render, screen, fireEvent } from '@testing-library/react';
import CreateCardPage from './CreateCardPage';

describe('CreateCardPage', () => {
    test('affiche correctement le formulaire de création', () => {
        render(<CreateCardPage />);
        expect(screen.getByText(/créer une nouvelle fiche/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/question/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/réponse/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/tag \(optionnel\)/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /créer la fiche/i })).toBeInTheDocument();
    });

    test('affiche un message d’erreur si les champs obligatoires sont vides', () => {
        render(<CreateCardPage />);
        const button = screen.getByRole('button', { name: /créer la fiche/i });
        fireEvent.click(button);
        expect(screen.getByText(/la question et la réponse sont requises/i)).toBeInTheDocument();
    });

    test('affiche un message de succès et réinitialise le formulaire quand la carte est créée', () => {
        render(<CreateCardPage />);
        const questionInput = screen.getByLabelText(/question/i);
        const answerInput = screen.getByLabelText(/réponse/i);
        const tagInput = screen.getByLabelText(/tag \(optionnel\)/i);
        const button = screen.getByRole('button', { name: /créer la fiche/i });

        fireEvent.change(questionInput, { target: { value: 'What is React?' } });
        fireEvent.change(answerInput, { target: { value: 'A library for building user interfaces.' } });
        fireEvent.change(tagInput, { target: { value: 'Frontend' } });
        fireEvent.click(button);

        expect(screen.getByText(/carte créée avec succès/i)).toBeInTheDocument();
        expect(questionInput).toHaveValue('');
        expect(answerInput).toHaveValue('');
        expect(tagInput).toHaveValue('');
    });
});
