import { Injectable } from "@nestjs/common";
import { CardService } from "./card.service";

@Injectable()
export class QuizzService {
    getQuizCategories(date: Date) {
        return [1];
    }
}