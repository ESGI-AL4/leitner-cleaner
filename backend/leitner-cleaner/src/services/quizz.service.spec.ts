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

    it('should only category 1', () => {
        const date = new Date('2024-01-01');
        const categories = service.getQuizCategories(date);
        expect(categories).toEqual([1]);
    });
})