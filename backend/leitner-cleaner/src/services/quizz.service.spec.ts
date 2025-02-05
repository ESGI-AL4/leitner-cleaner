import {QuizzService} from './quizz.service';
import {CardService} from './card.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Card } from '../entities';



const cards = [
    {
        id: 1,
        question: 'Question 1',
        answer: 'Answer 1',
        category: 1
    },
    {
        id: 2,
        question: 'Question 2',
        answer: 'Answer 2',
        category: 2
    },
    {
        id: 3,
        question: 'Question 3',
        answer: 'Answer 3',
        category: 3
    },
    {
        id: 4,
        question: 'Question 4',
        answer: 'Answer 4',
        category: 4
    },
    {
        id: 5,
        question: 'Question 5',
        answer: 'Answer 5',
        category: 5
    },
    {
        id: 6,
        question: 'Question 6',
        answer: 'Answer 6',
        category: 6
    },
    {
        id: 7,
        question: 'Question 7',
        answer: 'Answer 7',
        category: 7
    }
]

const getCardsOfCategory = (category: number) => cards.filter(card => card.category === category);

describe('QuizzService tests', () => {
    let service: QuizzService;
    let cardService: CardService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                QuizzService,
                CardService,
                {
                    provide: getRepositoryToken(Card),
                    useValue: {}
                }
            ]
        }).compile();

        service = module.get<QuizzService>(QuizzService);
        cardService = module.get<CardService>(CardService);
    });

    it('should return only category 1', () => {
        const date = new Date('2024-01-01');
        const categories = service.getQuizCategories(date);
        expect(categories).toEqual([1]);
    });

    it('should return categories 1 and 2', () => {
        const date = new Date('2024-01-02');
        const categories = service.getQuizCategories(date);
        expect(categories).toEqual([1, 2]);
    });

    it('should return categories 1 and 2 with another even day', () => {
        const date = new Date('2024-01-06');
        const categories = service.getQuizCategories(date);
        expect(categories).toEqual([1, 2]);
    });

    it('should return categories 1, 2 and 3', () => {
        const date = new Date('2024-01-04');
        const categories = service.getQuizCategories(date);
        expect(categories).toEqual([1, 2, 3]);
    });

    it('should return categories 1, 2 and 3 with day 12', () => {
        const date = new Date('2024-01-12');
        const categories = service.getQuizCategories(date);
        expect(categories).toEqual([1, 2, 3]);
    });

    it('should return categories 1 to 7 on day 64', () => {
        const date = new Date('2024-03-04');
        const categories = service.getQuizCategories(date);
        expect(categories).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('should return questions for category 1', () => {
        const categories = [1];
        const result = service.getQuizCards(categories);
        const expected = getCardsOfCategory(1);
        expect(result).toEqual(expected);
    });
})