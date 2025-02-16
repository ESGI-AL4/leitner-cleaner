import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { AuthContext } from '../../contexts/AuthContext';

describe('LoginPage', () => {
    const fakeAuth = { login: vi.fn(), logout: vi.fn(), user: null };

    const renderWithRouter = (ui: React.ReactElement) => {
        return render(
            <MemoryRouter>
                <AuthContext.Provider value={fakeAuth}>
                    {ui}
                </AuthContext.Provider>
            </MemoryRouter>
        );
    };

    test('renders the login form correctly', () => {
        renderWithRouter(<LoginPage />);
        expect(screen.getByText(/connexion/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
    });

    test('shows an error message if fields are empty', () => {
        renderWithRouter(<LoginPage />);
        const loginButton = screen.getByRole('button', { name: /se connecter/i });
        fireEvent.click(loginButton);
        expect(screen.getByText(/username and password are required/i)).toBeInTheDocument();
        expect(fakeAuth.login).not.toHaveBeenCalled();
    });

    test('calls the login function when fields are filled', () => {
        renderWithRouter(<LoginPage />);
        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: /se connecter/i });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.click(loginButton);

        expect(fakeAuth.login).toHaveBeenCalledWith('testuser');
    });
});
