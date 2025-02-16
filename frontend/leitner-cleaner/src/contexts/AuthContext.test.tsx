import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext } from './AuthContext';
import { describe, it, expect } from 'vitest';

const TestComponent: React.FC = () => {
  const context = useContext(AuthContext);
  return (
    <div>
      {/* Si user est null, on affichera "null" */}
      <div data-testid="user">{context.user ?? "null"}</div>
      <div data-testid="login-type">{typeof context.login}</div>
      <div data-testid="logout-type">{typeof context.logout}</div>
    </div>
  );
};

describe('AuthContext', () => {
  it('should provide default values when no provider is used', () => {
    render(<TestComponent />);
    // Le default user est null
    expect(screen.getByTestId('user').textContent).toBe("null");
    // Les fonctions login et logout doivent être de type "function"
    expect(screen.getByTestId('login-type').textContent).toBe("function");
    expect(screen.getByTestId('logout-type').textContent).toBe("function");
  });
});
