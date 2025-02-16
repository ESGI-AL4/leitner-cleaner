import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Layout from './Layout';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

// On mock useNavigate afin de contrôler la navigation
const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
  };
});

describe('Layout', () => {
  beforeEach(() => {
    mockedUsedNavigate.mockReset();
    vi.restoreAllMocks(); // réinitialise tous les mocks (prompt, console, etc.)
  });

  it('rend les enfants passés en props', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div data-testid="child">Contenu enfant</div>
        </Layout>
      </BrowserRouter>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('navigue vers "/cards" quand le bouton "Toutes mes cartes" est cliqué', async () => {
    render(
      <BrowserRouter>
        <Layout>
          <div />
        </Layout>
      </BrowserRouter>
    );
    const allCardsButton = screen.getByText("Toutes mes cartes");
    await userEvent.click(allCardsButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/cards');
  });

  it('navigue vers "/quiz" quand le bouton "Lancer le quiz" est cliqué', async () => {
    render(
      <BrowserRouter>
        <Layout>
          <div />
        </Layout>
      </BrowserRouter>
    );
    const startQuizButton = screen.getByText("Lancer le quiz");
    await userEvent.click(startQuizButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/quiz');
  });

  it('navigue vers "/create-card" quand le bouton "Ajouter une carte" est cliqué', async () => {
    render(
      <BrowserRouter>
        <Layout>
          <div />
        </Layout>
      </BrowserRouter>
    );
    const addCardButton = screen.getByText("Ajouter une carte");
    await userEvent.click(addCardButton);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/create-card');
  });

  it('programme une notification quand le bouton "Régler l\'heure des notifications" est cliqué et que prompt renvoie une valeur', async () => {
    // On simule que window.prompt renvoie "12:34"
    const promptSpy = vi.spyOn(window, 'prompt').mockReturnValue('12:34');
    const consoleSpy = vi.spyOn(console, 'log');

    render(
      <BrowserRouter>
        <Layout>
          <div />
        </Layout>
      </BrowserRouter>
    );
    const scheduleButton = screen.getByText("Régler l'heure des notifications");
    await userEvent.click(scheduleButton);

    expect(promptSpy).toHaveBeenCalledWith("Veuillez saisir l'heure (HH:MM) pour la notification du quiz du jour:");
    expect(consoleSpy).toHaveBeenCalledWith('Notification programmée à 12:34');

    promptSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it('ne fait rien si window.prompt renvoie null', async () => {
    // On simule que window.prompt renvoie null (annulation)
    const promptSpy = vi.spyOn(window, 'prompt').mockReturnValue(null);
    const consoleSpy = vi.spyOn(console, 'log');

    render(
      <BrowserRouter>
        <Layout>
          <div />
        </Layout>
      </BrowserRouter>
    );
    const scheduleButton = screen.getByText("Régler l'heure des notifications");
    await userEvent.click(scheduleButton);

    expect(promptSpy).toHaveBeenCalled();
    expect(consoleSpy).not.toHaveBeenCalled();

    promptSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
