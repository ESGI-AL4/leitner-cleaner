import { CardService } from './card.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Card } from '../entities';
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

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CardService,
                {
                    provide: getRepositoryToken(Card),
                    useValue: {
                        find: jest.fn(() => cards)
                    }
                }
            ],
        }).compile();
        service = module.get<CardService>(CardService);
    });

    it('should return all cards', () => {
        expect(service.getAll()).toEqual(cards);
    });
    
    it('should return all cards after adding a new card', () => {
        const newCard = {
            id: 5,
            category: 3,
            question: 'What is the capital of the United Kingdom?',
            answer: 'London',
            tag: null
        };
        cards.push(newCard);
        expect(service.getAll()).toEqual(cards);
    });
});