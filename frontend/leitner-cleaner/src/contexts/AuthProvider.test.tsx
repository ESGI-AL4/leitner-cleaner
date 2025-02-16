import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthProvider from './AuthProvider';
import { AuthContext } from './AuthContext';
import { describe, test, expect } from 'vitest';

// Composant de test qui utilise le contexte Auth
const TestComponent: React.FC = () => {
  const { user, login, logout } = useContext(AuthContext);
  return (
    <div>
      <div data-testid="user">{user || 'null'}</div>
      <button data-testid="login-btn" onClick={() => login('testuser')}>
        Login
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe('AuthProvider', () => {
  test('provides default values and updates on login and logout', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Vérifier que la valeur par défaut de user est "null"
    expect(screen.getByTestId('user').textContent).toBe('null');

    // Simuler le clic sur le bouton de login
    fireEvent.click(screen.getByTestId('login-btn'));
    expect(screen.getByTestId('user').textContent).toBe('testuser');

    // Simuler le clic sur le bouton de logout
    fireEvent.click(screen.getByTestId('logout-btn'));
    expect(screen.getByTestId('user').textContent).toBe('null');
  });
});
