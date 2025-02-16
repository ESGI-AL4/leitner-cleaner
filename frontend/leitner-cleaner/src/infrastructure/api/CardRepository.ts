// src/infrastructure/api/CardRepository.ts
import axios from 'axios';
import { CardType } from '../../components/cards/CardItem';

interface CreateCardRequest {
    question: string;
    answer: string;
    tag?: string;
}

export const createCard = async (card: CreateCardRequest): Promise<CardType> => {
    const backUrl = import.meta.env.VITE_BACK_URL;
    const response = await axios.post<CardType>(`${backUrl}/cards`, card, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};
