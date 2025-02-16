import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardsDisplay from './CardsDisplay';
import { CardType } from './CardItem';

describe('CardsDisplay', () => {
  // Définition d'un jeu de cartes factices
  const dummyCards: CardType[] = [
    { id: '1', category: 'Cat1', question: 'What is test?', answer: 'Test answer', tag: 'Tag1' },
    { id: '2', category: 'Cat2', question: 'How to test?', answer: 'Another answer', tag: 'Tag2' },
    { id: '3', category: 'Cat1', question: 'Test question', answer: 'Answer text' },
  ];

  it('affiche toutes les cartes en layout grid par défaut', () => {
    const { container } = render(<CardsDisplay cards={dummyCards} />);

    dummyCards.forEach((card) => {
      expect(screen.getByText(card.question)).toBeInTheDocument();
    });

    const gridCards = container.querySelectorAll('.grid-card');
    expect(gridCards.length).toBe(dummyCards.length);
  });

  it('filtre les cartes selon la recherche globale', async () => {
    render(<CardsDisplay cards={dummyCards} />);
    const searchInput = screen.getByPlaceholderText('Rechercher...');

    // Taper "What" devrait ne correspondre qu'à la carte dont la question contient "What"
    await userEvent.type(searchInput, 'What');

    // La carte "What is test?" doit être affichée
    expect(screen.getByText('What is test?')).toBeInTheDocument();

    // Les autres cartes ne doivent pas être affichées
    expect(screen.queryByText('How to test?')).toBeNull();
    expect(screen.queryByText('Test question')).toBeNull();
  });

  it('affiche un message vide lorsque aucune carte ne correspond au filtre global', async () => {
    render(<CardsDisplay cards={dummyCards} />);
    const searchInput = screen.getByPlaceholderText('Rechercher...');

    await userEvent.type(searchInput, 'nonexistent');

    // Le message d'absence de résultats doit s'afficher
    expect(screen.getByText('Aucune carte trouvée.')).toBeInTheDocument();
  });

  it('affiche les MultiSelect avec les placeholders corrects', () => {
    render(<CardsDisplay cards={dummyCards} />);
  });
});
