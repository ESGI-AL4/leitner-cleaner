import {Controller, Get, Post, Query, Body} from '@nestjs/common';
import { CardService } from '../services';
import { Card } from '../entities';
import {CardUserData, CardDTO } from 'types';

const CATEGORIES = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE'];

const mapCardCategory = (card:Card) => {
    return {...card, category: CATEGORIES[card.category - 1]};
}
@Controller('cards')
export class ConnectedUserController {
    constructor(
        private readonly cardService: CardService
    ) {}

    @Get()
    async getCards(@Query('tags') tags?:string): Promise<CardDTO[]> {
        let cards: Card[];
        if(tags) {
            cards = await this.cardService.getTags(tags.split(','));
        } else {
            cards = await this.cardService.getAllCards();
        }
        return cards.map(mapCardCategory);
    }

    @Post()
    async createCard(@Body() cardData: CardUserData): Promise<CardDTO> {
        const card = await this.cardService.createCard(cardData);
        return mapCardCategory(card);
    }

}
