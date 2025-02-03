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
}