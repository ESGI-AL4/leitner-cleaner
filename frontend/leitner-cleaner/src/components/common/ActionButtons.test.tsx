import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionButtons from './ActionButtons';
import { vi } from 'vitest';

describe('ActionButtons', () => {
    const onScheduleNotifications = vi.fn();
    const onStartQuiz = vi.fn();
    const onAddCard = vi.fn();
    const onAllCards = vi.fn();

    const renderComponent = () =>
      render(
        <ActionButtons
          onScheduleNotifications={onScheduleNotifications}
          onStartQuiz={onStartQuiz}
          onAddCard={onAddCard}
          onAllCards={onAllCards}
        />
      );

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('affiche tous les boutons avec les libellés corrects', () => {
        renderComponent();
        expect(screen.getByText("Régler l'heure des notifications")).toBeInTheDocument();
        expect(screen.getByText("Toutes mes cartes")).toBeInTheDocument();
        expect(screen.getByText("Lancer le quiz")).toBeInTheDocument();
        expect(screen.getByText("Ajouter une carte")).toBeInTheDocument();
    });

    it('déclenche onScheduleNotifications lors du clic sur le bouton "Régler l\'heure des notifications"', async () => {
        renderComponent();
        const scheduleButton = screen.getByText("Régler l'heure des notifications");
        await userEvent.click(scheduleButton);
        expect(onScheduleNotifications).toHaveBeenCalledTimes(1);
    });

    it('déclenche onAllCards lors du clic sur le bouton "Toutes mes cartes"', async () => {
        renderComponent();
        const allCardsButton = screen.getByText("Toutes mes cartes");
        await userEvent.click(allCardsButton);
        expect(onAllCards).toHaveBeenCalledTimes(1);
    });

    it('déclenche onStartQuiz lors du clic sur le bouton "Lancer le quiz"', async () => {
        renderComponent();
        const startQuizButton = screen.getByText("Lancer le quiz");
        await userEvent.click(startQuizButton);
        expect(onStartQuiz).toHaveBeenCalledTimes(1);
    });

    it('déclenche onAddCard lors du clic sur le bouton "Ajouter une carte"', async () => {
        renderComponent();
        const addCardButton = screen.getByText("Ajouter une carte");
        await userEvent.click(addCardButton);
        expect(onAddCard).toHaveBeenCalledTimes(1);
    });
});
