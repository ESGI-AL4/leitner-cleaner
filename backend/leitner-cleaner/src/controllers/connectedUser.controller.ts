import {Controller, Get} from '@nestjs/common';
import { CardService } from '../services';

@Controller('cards')
export class ConnectedUserController {
    constructor(
        private readonly cardService: CardService
    ) {}

    @Get()
    async getCards() {
        return this.cardService.getAll();
    }
}
