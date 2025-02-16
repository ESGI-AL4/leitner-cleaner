import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders login page content by default', () => {
    render(<App />);
    // Ici, on s'attend à ce que la page de connexion s'affiche avec "Connexion" comme titre
    expect(screen.getByText(/connexion/i)).toBeInTheDocument();
  });
});
