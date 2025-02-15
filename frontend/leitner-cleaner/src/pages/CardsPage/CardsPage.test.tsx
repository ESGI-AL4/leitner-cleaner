import { render, screen } from '@testing-library/react';
import CardsPage from './CardsPage';

describe('CardsPage', () => {
    test('affiche le titre de la page', () => {
        render(<CardsPage />);
        expect(screen.getByRole('heading', { name: /mes cartes/i })).toBeInTheDocument();
    });

    test('affiche au moins une carte (les données factices)', () => {
        render(<CardsPage />);
        expect(screen.getByText(/what is pair programming/i)).toBeInTheDocument();
    });

    test('affiche les trois boutons d\'action', () => {
        render(<CardsPage />);
        expect(screen.getByRole('button', { name: /régler l'heure des notifications/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /lancer le quiz/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /ajouter une carte/i })).toBeInTheDocument();
    });
});
