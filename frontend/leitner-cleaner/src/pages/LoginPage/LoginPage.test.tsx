// src/pages/LoginPage/LoginPage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';
import { AuthContext } from '../../contexts/AuthContext';
import '@testing-library/jest-dom';

describe('LoginPage', () => {
    test('renders the login form correctly', () => {
        const fakeAuth = { login: vi.fn(), logout: vi.fn(), user: null };
        render(
            <AuthContext.Provider value={fakeAuth}>
                <LoginPage />
            </AuthContext.Provider>
        );

        expect(screen.getByText(/connexion/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
    });

    test('shows an error message if fields are empty', () => {
        const fakeAuth = { login: vi.fn(), logout: vi.fn(), user: null };
        render(
            <AuthContext.Provider value={fakeAuth}>
                <LoginPage />
            </AuthContext.Provider>
        );

        const loginButton = screen.getByRole('button', { name: /se connecter/i });
        fireEvent.click(loginButton);

        expect(screen.getByText(/username and password are required/i)).toBeInTheDocument();
        expect(fakeAuth.login).not.toHaveBeenCalled();
    });

    test('calls the login function when fields are filled', () => {
        const fakeAuth = { login: vi.fn(), logout: vi.fn(), user: null };
        render(
            <AuthContext.Provider value={fakeAuth}>
                <LoginPage />
            </AuthContext.Provider>
        );

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: /se connecter/i });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.click(loginButton);

        expect(fakeAuth.login).toHaveBeenCalledWith('testuser');
    });
});
