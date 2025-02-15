
import { render, screen } from '@testing-library/react';
import AppRoutes from './AppRoutes';

describe('AppRoutes', () => {
    test('affiche la LoginPage quand on navigue sur "/login"', () => {
        window.history.pushState({}, 'Test page', '/login');
        render(<AppRoutes />);
        // Vérifie que le texte "Connexion" est présent dans la LoginPage
        expect(screen.getByText(/connexion/i)).toBeInTheDocument();
    });

    test('redirige vers "/login" pour une route inconnue', () => {
        window.history.pushState({}, 'Test page', '/unknown');
        render(<AppRoutes />);
        // La redirection doit afficher la LoginPage
        expect(screen.getByText(/connexion/i)).toBeInTheDocument();
    });
});
