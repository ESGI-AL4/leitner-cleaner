import { CardService } from './card.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindManyOptions } from 'typeorm';
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
        tag: 'test2'
    },
    {
        id: 3,
        category: 2,
        question: 'What is the capital of Germany?',
        answer: 'Berlin',
        tag: 'test'
    },
    {
        id: 4,
        category: 3,
        question: 'What is the capital of Italy?',
        answer: 'Rome',
        tag: 'test'
    }
];

const getCardsOfCategory = (category: number) => cards.filter(card => card.category === category);
const getCardsWithTag = (tag: string) => cards.filter(card => card.tag === tag);

describe('CardService tests', () => {
    let service: CardService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CardService,
                {
                    provide: getRepositoryToken(Card),
                    useValue: {
                        find: jest.fn((queryParams?: FindManyOptions<Card>) => {
                            let result = cards;
                            if (queryParams) {
                                if(queryParams.where['tag']) {
                                    result = cards.filter(card => card.tag === queryParams.where['tag']);
                                } else if(queryParams.where['category']) {
                                    result = cards.filter(card => card.category === queryParams.where['category']);
                                }
                            }
                            return result;
                        }),
                        save: jest.fn((card) => {
                            const newCard = {
                                id: cards.length,
                                ...card
                            };
                            cards.push(newCard);
                            return newCard;
                        }),
                        findOne: jest.fn((queryParams) => {
                            const card = cards.find(card => card.id === queryParams.where.id);
                            return card;
                        })
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

    it('should return all cards of category 1', () => {
        expect(service.getCategory(1)).toEqual(getCardsOfCategory(1));
    });

    it('should return all cards of category 2', () => {
        expect(service.getCategory(2)).toEqual(getCardsOfCategory(2));
    });

    it('should return all cards with tag "test"', () => {
        const tag = 'test';
        expect(service.getTag(tag)).toEqual(getCardsWithTag(tag));
    });

    it('should return all cards with tag "test2"', () => {
        const tag = 'test2';
        expect(service.getTag(tag)).toEqual(getCardsWithTag(tag));
    });

    it('create should return correct card', async () => {
        const newCard = {
            question: 'What is the capital of the United Kingdom?',
            answer: 'London',
            tag: null
        };
        const newId = cards.length;
        const createdCard = await service.create(newCard);
        expect(createdCard).toEqual({...newCard, id: newId, category: 1});
    });

    it('create should return correct card with tag', async () => {
        const newCard = {
            question: 'What is the capital of the United Kingdom?',
            answer: 'London',
            tag: 'test'
        };
        const newId = cards.length;
        const createdCard = await service.create(newCard);
        expect(createdCard).toEqual({...newCard, id: newId, category: 1});
    });

    it('create should create a card', async () => {
        const newCard = {
            question: 'What is the capital of the United Kingdom?',
            answer: 'London',
            tag: null
        };
        const oldLength = cards.length;
        await service.create(newCard);
        expect(cards.length).toEqual(oldLength + 1);
    });

    it('updateTag should return card with the updated card', async () => {
        const id = 2;
        const tag = 'test3';
        const updatedCard = await service.updateTag(id, tag);
        expect(updatedCard).toEqual({...cards[id-1], tag});
    });

    it('updateTag should return card with updates with another value', async () => {
        const id = 3;
        const tag = 'test4';
        const updatedCard = await service.updateTag(id, tag);
        expect(updatedCard).toEqual({...cards[id-1], tag});
    });

    it('updateCategory should return card with the updated category', async () => {
        const id = 1;
        const category = 3;
        const updatedCard = await service.updateCategory(id, category);
        expect(updatedCard).toEqual({...cards[id-1], category});
    });
    
});