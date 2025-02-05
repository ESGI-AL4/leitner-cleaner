import { Injectable } from "@nestjs/common";
import { CardService } from "./card.service";

@Injectable()
export class QuizzService {
    getQuizCategories(date: Date) {
        //Difference in days between the date and the first day of the year
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const dayDifference = Math.ceil((date.getTime() - firstDayOfYear.getTime()) / (1000 * 3600 * 24));
        const categories = [1];
        let factor = 2;
        for(let i = 2; i <= 7; i++) {
            if(dayDifference % factor === 0) {
                categories.push(i);
            }
            factor *= 2;
        }
        return categories;
    }

    getQuizCards(categories: number[]) {
        return [{
            id: 1,
            question: 'Question 1',
            answer: 'Answer 1',
            category: 1
        }]
    }
}