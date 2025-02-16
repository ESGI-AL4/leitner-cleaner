import {Controller, Get, HttpException, HttpStatus, Query} from '@nestjs/common';
import { CardService } from '../services';
import { Card } from '../entities';

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
}
