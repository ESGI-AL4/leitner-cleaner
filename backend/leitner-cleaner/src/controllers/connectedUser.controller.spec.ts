import { Test } from '@nestjs/testing';
import { ConnectedUserController } from './connectedUser.controller';
import { CardService } from '../services/card.service';

describe('ConnectedUserController tests', () => {

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
            category: 2,
            question: 'What is the capital of the United States?',
            answer: 'Washington D.C.',
            tag: null
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf29',
            category: 1,
            question: 'What is the capital of the United Kingdom?',
            answer: 'London',
            tag: null
        },
        {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf30',
            category: 2,
            question: 'What is the capital of Japan?',
            answer: 'Tokyo',
            tag: 'test'
        }
    ]

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [ConnectedUserController],
            providers: []
        }).useMocker(token => {
            if(token === CardService) {
                return {
                    getAll: () => cards
                }
            }
        }).compile();
        cardService = module.get<CardService>(CardService);
    })
    
    it('should return all cards', async () => {
        expect(await cardService.getAll()).toEqual(cards);
    });

});