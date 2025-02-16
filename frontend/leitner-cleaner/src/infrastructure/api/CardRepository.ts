// src/infrastructure/api/CardRepository.ts
import axios from 'axios';
import { CardType } from '../../components/cards/CardItem';

interface CreateCardRequest {
    question: string;
    answer: string;
    tag?: string;
}

export const createCard = async (card: CreateCardRequest): Promise<CardType> => {
    const response = await axios.post<CardType>('http://localhost:8080/cards', card, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};
