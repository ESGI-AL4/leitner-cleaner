import { Injectable } from "@nestjs/common";
import { CardService } from "./card.service";

@Injectable()
export class QuizzService {
    constructor(private cardService: CardService) {}

    getQuizzCategories(date: Date) {
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

    getQuizz(date?: Date) {
        return [
            {
                id: 'a420531b-6123-4b88-a642-2b593fbbaf24',
                category: 1,
                question: 'What is the capital of France?',
                answer: 'Paris',
                tag: null
            },
            {
                id: 'a420531b-6123-4b88-a642-2b593fbbaf25',
                category: 1,
                question: 'What is the capital of Spain?',
                answer: 'Madrid',
                tag: 'test2'
            }
        ]
    }
}