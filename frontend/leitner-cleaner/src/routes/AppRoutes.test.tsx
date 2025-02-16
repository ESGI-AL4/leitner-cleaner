import React from 'react';
import { render, screen } from '@testing-library/react';
import AppRoutes from './AppRoutes';
import { vi } from 'vitest';

// On mocke les composants pour simplifier le rendu des routes
vi.mock('../pages/LoginPage/LoginPage', () => ({
    default: () => <div>Login Page</div>,
}));

vi.mock('../pages/CardsPage/CardsPage.tsx', () => ({
    default: () => <div>Cards Page</div>,
}));

vi.mock('../pages/QuizPage/QuizPage', () => ({
    default: () => <div>Quiz Page</div>,
}));

vi.mock('../pages/CreateCardPage/CreateCardPage.tsx', () => ({
    default: () => <div>Create Card Page</div>,
}));

// Pour Layout, nous renvoyons simplement les enfants passés en props
vi.mock('../components/layout/Layout.tsx', () => ({
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('AppRoutes', () => {
    // Fonction utilitaire pour modifier l'URL et rendre le composant
    const renderWithRoute = (route: string) => {
        window.history.pushState({}, 'Test page', route);
        return render(<AppRoutes />);
    };

    it('affiche LoginPage lorsque la route est "/login"', () => {
        renderWithRoute('/login');
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    it('affiche CardsPage lorsque la route est "/cards"', () => {
        renderWithRoute('/cards');
        expect(screen.getByText('Cards Page')).toBeInTheDocument();
    });

    it('affiche QuizPage lorsque la route est "/quiz"', () => {
        renderWithRoute('/quiz');
        expect(screen.getByText('Quiz Page')).toBeInTheDocument();
    });

    it('affiche CreateCardPage lorsque la route est "/create-card"', () => {
        renderWithRoute('/create-card');
        expect(screen.getByText('Create Card Page')).toBeInTheDocument();
    });

    it('redirige vers "/login" pour toute route inconnue', () => {
        renderWithRoute('/unknown-route');
        // La redirection par défaut devrait afficher le LoginPage
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
});
