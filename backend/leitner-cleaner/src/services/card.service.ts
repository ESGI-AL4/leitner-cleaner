import {Injectable} from '@nestjs/common';
import {Card} from '../entities';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
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
        return [
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
    }
}