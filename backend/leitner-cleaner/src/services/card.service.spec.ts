import { CardService } from './card.service';
const cards = [
    {
        id: 1,
        category: 1,
        question: 'What is the capital of France?',
        answer: 'Paris',
        tag: null
    },
    {
        id: 2,
        category: 1,
        question: 'What is the capital of Spain?',
        answer: 'Madrid',
        tag: null
    },
    {
        id: 3,
        category: 2,
        question: 'What is the capital of Germany?',
        answer: 'Berlin',
        tag: null
    },
    {
        id: 4,
        category: 3,
        question: 'What is the capital of Italy?',
        answer: 'Rome',
        tag: null
    }
]

describe('CardService tests', () => {
    let service: CardService;

    beforeEach(() => {
        service = new CardService();
    });

    it('should return all cards', () => {
        expect(service.getAll()).toEqual(cards);
    });
        
});