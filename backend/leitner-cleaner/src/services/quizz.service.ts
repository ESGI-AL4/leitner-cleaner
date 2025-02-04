import { Injectable } from "@nestjs/common";
import { CardService } from "./card.service";

@Injectable()
export class QuizzService {
    getQuizCategories(date: Date) {
        const categories = [1];
        let factor = 2;
        for(let i = 2; i <= 3; i++) {
            if(date.getDate() % factor === 0) {
                categories.push(i);
            }
            factor *= 2;
        }
        return categories;
    }
}