import {QuizzService} from './quizz.service';
import {CardService} from './card.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Card } from '../entities';

describe('QuizzService tests', () => {
    let service: QuizzService;
    let cardService: CardService;

    const cards = [
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf24',
            category: 1,
            question: 'What is the capital of France?',
            answer: 'Paris',
            tag: null
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf25',
            category: 1,
            question: 'What is the capital of Spain?',
            answer: 'Madrid',
            tag: 'test2'
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf26',
            category: 2,
            question: 'What is the capital of Germany?',
            answer: 'Berlin',
            tag: 'test'
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf27',
            category: 3,
            question: 'What is the capital of Italy?',
            answer: 'Rome',
            tag: 'test'
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf28',
            category: 4,
            question: 'What is the capital of the United States?',
            answer: 'Washington D.C.',
            tag: null
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf29',
            category: 5,
            question: 'What is the capital of the United Kingdom?',
            answer: 'London',
            tag: null
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf30',
            category: 6,
            question: 'What is the capital of Japan?',
            answer: 'Tokyo',
            tag: null
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf31',
            category: 7,
            question: 'What is the capital of China?',
            answer: 'Beijing',
        }
    ];

    const getCardsOfCategories = (categories: number[]) => cards.filter(card => categories.includes(card.category));

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                QuizzService
            ]
        }).useMocker(token => {
            if(token === CardService) {
                return {
                    getCategories: jest.fn((categories: number[]) => {
                        return cards.filter(card => categories.includes(card.category));
                    }),
                    updateCategory: jest.fn((id: string, category: number) => {
                        const card = cards.find(card => card.id === id);
                        card.category = category;
                    })
                }
            }
        }).compile();

        service = module.get<QuizzService>(QuizzService);
        cardService = module.get<CardService>(CardService);
    });

    it('should return only category 1', () => {
        const date = new Date('2024-01-01');
        const categories = service.getQuizzCategories(date);
        expect(categories).toEqual([1]);
    });

    it('should return categories 1 and 2', () => {
        const date = new Date('2024-01-02');
        const categories = service.getQuizzCategories(date);
        expect(categories).toEqual([1, 2]);
    });

    it('should return categories 1 and 2 with another even day', () => {
        const date = new Date('2024-01-06');
        const categories = service.getQuizzCategories(date);
        expect(categories).toEqual([1, 2]);
    });

    it('should return categories 1, 2 and 3', () => {
        const date = new Date('2024-01-04');
        const categories = service.getQuizzCategories(date);
        expect(categories).toEqual([1, 2, 3]);
    });

    it('should return categories 1, 2 and 3 with day 12', () => {
        const date = new Date('2024-01-12');
        const categories = service.getQuizzCategories(date);
        expect(categories).toEqual([1, 2, 3]);
    });

    it('should return categories 1 to 7 on day 64', () => {
        const date = new Date('2024-03-04');
        const categories = service.getQuizzCategories(date);
        expect(categories).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('should return questions of category 1 for day 1', () => {
        const date = new Date('2024-01-01');
        const questions = service.getQuizz(date);
        const expectedQuestions = getCardsOfCategories([1]);
        expect(questions).toEqual(expectedQuestions);
    });

    it('should return questions of category 1 and 2 for day 2', () => {
        const date = new Date('2024-01-02');
        const questions = service.getQuizz(date);
        const expectedQuestions = getCardsOfCategories([1, 2]);
        expect(questions).toEqual(expectedQuestions);
    });

    it('should change category of card to 1 when failing question', () => {
        const id = 'a420531b-6123-4b88-a642-2b593fbbaf31';
        service.answerQuestion(id, false);
        expect(cards.find(card => card.id === id).category).toBe(1);
    });

})