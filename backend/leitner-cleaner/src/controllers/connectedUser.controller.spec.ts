import { Test } from '@nestjs/testing';
import { ConnectedUserController } from './connectedUser.controller';
import { CardService } from '../services';

describe('ConnectedUserController tests', () => {

    
    let controller: ConnectedUserController;
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

    const cardsWithTags = (tags: string[]) => cards.filter(card => tags.includes(card.tag));

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [
                ConnectedUserController
            ]
        }).useMocker(token => {
            if(token === CardService) {
                return {
                    getAllCards: jest.fn(() => cards),
                    getTags: jest.fn((tags: string[]) => cards.filter(card => tags.includes(card.tag)))
                }
            }
        }).compile();
        
        controller = module.get<ConnectedUserController>(ConnectedUserController);
    })

    it('should return all cards', async () => {
        expect(await controller.getCards()).toEqual(cards);
    });

    it('should return all cards after adding one', async () => {
        const newCard = {
            id: 'a420531b-6123-4b88-a642-2b593fbbaf31',
            category: 1,
            question: 'What is the capital of Canada?',
            answer: 'Ottawa',
            tag: null
        }
        cards.push(newCard);
        expect(await controller.getCards()).toEqual(cards);
    });

    it('should return all cards with tag test2', async () => {
        expect(await controller.getCards('test2')).toEqual(cardsWithTags(['test2']));
    })

    it('should return all cards with tag test and test2', async () => {
        expect(await controller.getCards('test,test2')).toEqual(cardsWithTags(['test', 'test2']));
    })

});