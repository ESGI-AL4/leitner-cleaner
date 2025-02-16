import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthProvider from './AuthProvider';
import { AuthContext } from './AuthContext';
import { describe, it, expect } from 'vitest';

// Composant de test qui affiche la valeur de "user" et dispose de boutons pour appeler login et logout
const TestComponent: React.FC = () => {
  const { user, login, logout } = useContext(AuthContext);
  return (
    <div>
      <div data-testid="user">{user ?? "null"}</div>
      <button data-testid="login-btn" onClick={() => login("testuser")}>
        Login
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe('AuthProvider functions', () => {
  it('updates user on login and resets on logout', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Par défaut, user est null
    expect(screen.getByTestId("user").textContent).toBe("null");

    // Simuler un clic sur le bouton de login
    fireEvent.click(screen.getByTestId("login-btn"));
    expect(screen.getByTestId("user").textContent).toBe("testuser");

    // Simuler un clic sur le bouton de logout
    fireEvent.click(screen.getByTestId("logout-btn"));
    expect(screen.getByTestId("user").textContent).toBe("null");
  });
});
