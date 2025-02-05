import {Injectable} from '@nestjs/common';
import {Card} from '../entities';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { CardUserData, CardRepoPayload } from 'types';

@Injectable()
export class CardService { 
    constructor(
        @InjectRepository(Card)
        private cardRepository: Repository<Card>
    ) {}
    getAll() {
        return this.cardRepository.find();
    }

    getCategory(category: number) {
        return this.cardRepository.find({where: {category}});
    }

    getTag(tag: string) {
        return this.cardRepository.find({where: {tag}});
    }

    async create(card: CardUserData) {
        const newCard: CardRepoPayload = {...card, category: 1};
        return this.cardRepository.save(newCard);
    }

    async updateTag(id: string, tag: string) {
        return this.cardRepository.update(id, {tag});
    }

    async updateCategory(id: string, category: number) {
        return this.cardRepository.update(id, {category});
    }

    async getCategories(categories: number[]) {
        return [
                {
                    answer: "Paris",
                    category: 1,
                    id: "a420531b-6123-4b88-a642-2b593fbbaf24",
                    question: "What is the capital of France?",
                    tag: "test3",
                },
                {
                    answer: "Madrid",
                    category: 1,
                    id: "a420531b-6123-4b88-a642-2b593fbbaf25",
                    question: "What is the capital of Spain?",
                    tag: "test4",
                },
                {
                    answer: "Berlin",
                    category: 2,
                    id: "a420531b-6123-4b88-a642-2b593fbbaf26",
                    question: "What is the capital of Germany?",
                    tag: "test5",
                },
                {
                    answer: "Washington D.C.",
                    category: 2,
                    id: "a420531b-6123-4b88-a642-2b593fbbaf28",
                    question: "What is the capital of the United States?",
                    tag: null,
                },
                {
                    answer: "Tokyo",
                    category: 2,
                    id: "a420531b-6123-4b88-a642-2b593fbbaf30",
                    question: "What is the capital of Japan?",
                    tag: "test",
                },
                {
                    answer: "London",
                    category: 1,
                    id: 8,
                    question: "What is the capital of the United Kingdom?",
                    tag: null,
                },
                {
                    answer: "London",
                    category: 1,
                    id: 9,
                    question: "What is the capital of the United Kingdom?",
                    tag: "test",
                },
                {
                    answer: "London",
                    category: 1,
                    id: 10,
                    question: "What is the capital of the United Kingdom?",
                    tag: null,
                }];
    }
}