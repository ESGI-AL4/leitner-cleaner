import {Injectable} from '@nestjs/common';

@Injectable()
export class CardService {
    getAll() {
        return [
            {
                id: 1,
                category: 1,
                question: 'What is the capital of France?',
                answer: 'Paris',
                tag: null
            },
            {
                id: 2,
                category: 1,
                question: 'What is the capital of Spain?',
                answer: 'Madrid',
                tag: null
            },
            {
                id: 3,
                category: 2,
                question: 'What is the capital of Germany?',
                answer: 'Berlin',
                tag: null
            },
            {
                id: 4,
                category: 3,
                question: 'What is the capital of Italy?',
                answer: 'Rome',
                tag: null
            }
        ];
    }
}