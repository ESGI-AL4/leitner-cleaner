import {QuizzService} from './quizz.service';
import {CardService} from './card.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Card } from '../entities';

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
})