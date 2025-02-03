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

    async updateTag(id: number, tag: string) {
        return {
            id: 2,
            category: 1,
            question: 'What is the capital of Spain?',
            answer: 'Madrid',
            tag: 'test3'
        };
    }
}