import { render, screen } from '@testing-library/react';
import CardItem, { CardType } from './CardItem';

describe('CardItem', () => {
    const mockCardWithTag: CardType = {
        id: '1',
        category: 'Science',
        question: 'Quelle est la vitesse de la lumière ?',
        answer: '299 792 458 m/s',
        tag: 'Physique'
    };

    const mockCardWithoutTag: CardType = {
        id: '2',
        category: 'Histoire',
        question: 'Qui a découvert l’Amérique ?',
        answer: 'Christophe Colomb'
        // pas de tag
    };

    it('affiche correctement une carte avec tag', () => {
        render(<CardItem card={mockCardWithTag} />);

        // Vérifier que le titre (question) est affiché
        expect(screen.getByText(mockCardWithTag.question)).toBeInTheDocument();

        // Vérifier que la réponse est affichée
        expect(screen.getByText(mockCardWithTag.answer)).toBeInTheDocument();

        // Vérifier que la catégorie est affichée
        expect(screen.getByText(`Catégorie : ${mockCardWithTag.category}`)).toBeInTheDocument();

        // Vérifier que le tag est affiché
        expect(screen.getByText(`Tag : ${mockCardWithTag.tag}`)).toBeInTheDocument();
    });

    it('affiche correctement une carte sans tag', () => {
        render(<CardItem card={mockCardWithoutTag} />);

        // Vérifier que le titre (question) est affiché
        expect(screen.getByText(mockCardWithoutTag.question)).toBeInTheDocument();

        // Vérifier que la réponse est affichée
        expect(screen.getByText(mockCardWithoutTag.answer)).toBeInTheDocument();

        // Vérifier que la catégorie est affichée
        expect(screen.getByText(`Catégorie : ${mockCardWithoutTag.category}`)).toBeInTheDocument();

        // Vérifier que le tag n'est pas affiché
        expect(screen.queryByText(/Tag :/)).toBeNull();
    });
});
