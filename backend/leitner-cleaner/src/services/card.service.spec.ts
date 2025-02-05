import { CardService } from './card.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindManyOptions } from 'typeorm';
import { Card } from '../entities';
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
];

const getCardsOfCategory = (category: number) => cards.filter(card => card.category === category);
const getCardsOfCategories = (categories: number[]) => cards.filter(card => categories.includes(card.category));
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
                        }),
                        update: jest.fn((id, card) => {
                            const updatedCard = cards.find(card => card.id === id);
                            Object.keys(card).forEach(key => {
                                updatedCard[key] = card[key];
                            });
                            return updatedCard;
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
            id: 'a420531b-6123-4b88-a642-2b593fbbaf31',
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
        const id = 'a420531b-6123-4b88-a642-2b593fbbaf24';
        const tag = 'test3';
        const updatedCard = await service.updateTag(id, tag);
        expect(updatedCard).toEqual({...(cards.find(card => card.id === id)), tag});
    });

    it('updateTag should return card with updates with another value', async () => {
        const id = 'a420531b-6123-4b88-a642-2b593fbbaf25';
        const tag = 'test4';
        const updatedCard = await service.updateTag(id, tag);
        expect(updatedCard).toEqual({...(cards.find(card => card.id === id)), tag});
    });

    it('updateTag should update the tag in the database', async () => {
        const id = 'a420531b-6123-4b88-a642-2b593fbbaf26';
        const tag = 'test5';
        await service.updateTag(id, tag);
        const updatedCard = cards.find(card => card.id === id);
        expect(updatedCard.tag).toEqual(tag);
    });

    it('updateCategory should return card with the updated category', async () => {
        const id = 'a420531b-6123-4b88-a642-2b593fbbaf27';
        const category = 3;
        const updatedCard = await service.updateCategory(id, category);
        expect(updatedCard).toEqual({...(cards.find(card => card.id === id)), category});
    });

    it('updateCategory should return card with updates with another value', async () => {
        const id = 'a420531b-6123-4b88-a642-2b593fbbaf28';
        const category = 2;
        const updatedCard = await service.updateCategory(id, category);
        expect(updatedCard).toEqual({...(cards.find(card => card.id === id)), category});
    });
    
    it('updateCategory should update the category in the database', async () => {
        const id = 'a420531b-6123-4b88-a642-2b593fbbaf29';
        const category = 3;
        await service.updateCategory(id, category);
        const updatedCard = cards.find(card => card.id === id);
        expect(updatedCard.category).toEqual(category);
    });

    it('getCategories should return all cards of categories 1 and 2', async () => {
        const categories = [1, 2];
        const result = getCardsOfCategories(categories);
        expect(await service.getCategories(categories)).toEqual(result);
    });
});