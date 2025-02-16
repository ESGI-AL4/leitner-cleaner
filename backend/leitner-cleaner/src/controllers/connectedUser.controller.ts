import {Controller, Get, HttpException, HttpStatus, Post, Query, Body} from '@nestjs/common';
import { CardService } from '../services';
import { Card } from '../entities';
import { CardRepoPayload, CardUserData } from 'types';

@Controller('cards')
export class ConnectedUserController {
    constructor(
        private readonly cardService: CardService
    ) {}

    @Get()
    async getCards(@Query('tags') tags?:string): Promise<Card[]> {
        if(tags) {
            return this.cardService.getTags(tags.split(','));
        }
        return this.cardService.getAllCards();
    }

    @Post()
    async createCard(@Body() cardData: CardUserData): Promise<Card> {
        return this.cardService.createCard(cardData);
    }

}
