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
        const cards: Card[] = [];
        categories.forEach(async category => {
            cards.push(...(await this.getCategory(category)));
        });
        return cards;
    }

    async getCardCategory(id: string) {
        const card = await this.cardRepository.findOne({where: {id}});
        return card.category;
    }
}