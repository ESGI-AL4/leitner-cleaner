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
    getAllCards() {
        return this.cardRepository.find();
    }

    getCategory(category: number) {
        return this.cardRepository.find({where: {category}});
    }

    getTag(tag: string) {
        return this.cardRepository.find({where: {tag}});
    }

    async createCard(card: CardUserData) {
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
        const cards: Card[] = [];
        categories.forEach(async category => {
            cards.push(...(await this.getCategory(category)));
        });
        return cards;
    }

    async getTags(tags: string[]) {
        return [
                    {
                        "answer": "Rome",
                        "category": 3,
                        "id": "a420531b-6123-4b88-a642-2b593fbbaf27",
                        "question": "What is the capital of Italy?",
                        "tag": "test",
                    },
                    {
                        "answer": "Tokyo",
                        "category": 2,
                        "id": "a420531b-6123-4b88-a642-2b593fbbaf30",
                        "question": "What is the capital of Japan?",
                        "tag": "test2",
                    },
                    {
                        "answer": "London",
                        "category": 1,
                        "id": "a420531b-6123-4b88-a642-2b593fbbaf33",
                        "question": "What is the capital of the United Kingdom?",
                        "tag": "test",
                    },
                ];
    }

    async getCardCategory(id: string) {
        const card = await this.cardRepository.findOne({where: {id}});
        return card.category;
    }
}