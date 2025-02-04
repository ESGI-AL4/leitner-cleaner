import {Controller, Get} from '@nestjs/common';
import { CardService } from '../services';

@Controller('cards')
export class ConnectedUserController {
    constructor(
        private readonly cardService: CardService
    ) {}
}
