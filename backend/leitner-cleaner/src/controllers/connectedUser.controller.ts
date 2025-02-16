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
            return [{
                id: 'a420531b-6123-4b88-a642-2b593fbbaf25',
                category: 1,
                question: 'What is the capital of Spain?',
                answer: 'Madrid',
                tag: 'test2'
            }];
        }
        return this.cardService.getAllCards();
    }
}
