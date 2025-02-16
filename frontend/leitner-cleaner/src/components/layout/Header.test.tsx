import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { vi } from 'vitest';

describe('Header', () => {
    const onScheduleNotifications = vi.fn();
    const onAllCards = vi.fn();
    const onStartQuiz = vi.fn();
    const onAddCard = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () =>
      render(
        <Header
          onScheduleNotifications={onScheduleNotifications}
          onAllCards={onAllCards}
          onStartQuiz={onStartQuiz}
          onAddCard={onAddCard}
        />
      );

    it('affiche le header et les boutons via ActionButtons', () => {
        renderComponent();

        // Vérification de la présence de l'élément header (role "banner")
        const headerElement = screen.getByRole('banner');
        expect(headerElement).toBeInTheDocument();

        // Vérification que les libellés des boutons apparaissent
        expect(screen.getByText("Régler l'heure des notifications")).toBeInTheDocument();
        expect(screen.getByText("Toutes mes cartes")).toBeInTheDocument();
        expect(screen.getByText("Lancer le quiz")).toBeInTheDocument();
        expect(screen.getByText("Ajouter une carte")).toBeInTheDocument();
    });

    it('déclenche onScheduleNotifications lors du clic sur "Régler l\'heure des notifications"', async () => {
        renderComponent();
        const scheduleButton = screen.getByText("Régler l'heure des notifications");
        await userEvent.click(scheduleButton);
        expect(onScheduleNotifications).toHaveBeenCalledTimes(1);
    });

    it('déclenche onAllCards lors du clic sur "Toutes mes cartes"', async () => {
        renderComponent();
        const allCardsButton = screen.getByText("Toutes mes cartes");
        await userEvent.click(allCardsButton);
        expect(onAllCards).toHaveBeenCalledTimes(1);
    });

    it('déclenche onStartQuiz lors du clic sur "Lancer le quiz"', async () => {
        renderComponent();
        const startQuizButton = screen.getByText("Lancer le quiz");
        await userEvent.click(startQuizButton);
        expect(onStartQuiz).toHaveBeenCalledTimes(1);
    });

    it('déclenche onAddCard lors du clic sur "Ajouter une carte"', async () => {
        renderComponent();
        const addCardButton = screen.getByText("Ajouter une carte");
        await userEvent.click(addCardButton);
        expect(onAddCard).toHaveBeenCalledTimes(1);
    });
});
