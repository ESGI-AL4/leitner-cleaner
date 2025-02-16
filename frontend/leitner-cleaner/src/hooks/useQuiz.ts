import { useState, useEffect } from 'react';
import { Card } from '../domain/entities/Card';

interface UseQuizReturn {
    currentCard: Card | null;
    isAnswerVisible: boolean;
    showAnswer: () => void;
    evaluateAnswer: (success: boolean) => void;
    isQuizComplete: boolean;
    correctAnswers: number;
    totalCards: number;
    currentQuestionNumber: number;
    loading: boolean;
    error: string | null;
    fetchCard: (moveToNext?: boolean) => void;
}

export const useQuiz = (date: string): UseQuizReturn => {
    const [cards, setCards] = useState<Card[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const backUrl = import.meta.env.VITE_BACK_URL;

    const fetchCard = async (moveToNext: boolean = false) => {
        if (moveToNext) {
            setCurrentIndex(prev => prev + 1);
            setIsAnswerVisible(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${backUrl}/cards/quizz?date=${date}`);
            if (!response.ok) {
                throw new Error('Failed to fetch cards');
            }
            const data = await response.json();
            setCards(data);
        } catch (error) {
            setError('Error fetching cards: ' + (error instanceof Error ? error.message : String(error)));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCard();
    }, [date]);

    const currentCard = cards.length > 0 ? cards[currentIndex] : null;

    const showAnswer = () => {
        setIsAnswerVisible(true);
    };

    const evaluateAnswer = async (success: boolean) => {
        if (!currentCard) return;

        try {
            const response = await fetch(`${backUrl}/cards/${currentCard.id}/answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isValid: success }),
            });
            console.log('response', response);

            if (!response.ok) {
                throw new Error('Failed to evaluate card');
            }

            if (success) {
                setCorrectAnswers(prev => prev + 1);
            }

            if (currentIndex < cards.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setIsAnswerVisible(false);
            } else {
                setIsQuizComplete(true);
            }
        } catch (error) {
            console.error('Error evaluating card:', error);
        }
    };

    return {
        currentCard,
        isAnswerVisible,
        showAnswer,
        evaluateAnswer,
        isQuizComplete,
        correctAnswers,
        totalCards: cards.length,
        currentQuestionNumber: currentIndex + 1,
        loading,
        error,
        fetchCard
    };
};
