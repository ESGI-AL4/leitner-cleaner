import { Injectable } from "@nestjs/common";
import { CardService } from "./card.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Quizz } from "../entities";
import { Repository } from "typeorm";

@Injectable()
export class QuizzService {
    constructor(
        private cardService: CardService,
        @InjectRepository(Quizz)
        private quizzRepository: Repository<Quizz>
    ) {}

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

    getQuizz(date: Date) {
        if(this.quizzRepository.find({where: {date}})) {
            return [];
        }
        const categories = this.getQuizzCategories(date);
        return this.cardService.getCategories(categories);
    }

    async answerQuestion(id: string, correct: boolean) {
        if(correct) {
            const oldCategory = await this.cardService.getCardCategory(id);
            return this.cardService.updateCategory(id, oldCategory + 1);
        }
        this.cardService.updateCategory(id, 1);
    }
}