import { Injectable } from "@nestjs/common";
import { CardService } from "./card.service";

@Injectable()
export class QuizzService {
    getQuizCategories(date: Date) {
        if (date.getDate() % 2 === 0) {
            return [1, 2];
        }
        return [1];
    }
}