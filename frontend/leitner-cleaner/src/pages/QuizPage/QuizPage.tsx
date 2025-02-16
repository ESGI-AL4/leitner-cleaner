import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { useQuiz } from '../../hooks/useQuiz';
import './QuizPage.css';

const QuizPage: React.FC = () => {
    const [answer, setAnswer] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { 
        currentCard, 
        loading, 
        error, 
        fetchCard,
        currentQuestionNumber,
        totalCards 
    } = useQuiz('2024-01-01');

    const validationOptions = [
        { label: 'Correct', value: true, icon: 'pi pi-check' },
        { label: 'Incorrect', value: false, icon: 'pi pi-times' }
    ];

    const handleSubmit = () => {
        if (answer.trim()) {
            setIsSubmitted(true);
        }
    };

    const evaluateAnswer = async (success: boolean) => {
        if (!currentCard) return;

        try {
            const response = await fetch(`http://localhost:3000/cards/${currentCard.id}/answer`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isValid: success }),
            });
            console.log('response', response);

            if (!response.ok) {
                throw new Error('Failed to evaluate card');
            }
        } catch (error) {
            console.error('Error evaluating card:', error);
        }
    };

    const handleValidation = (e: SelectButtonChangeEvent) => {
        console.log(`Answer marked as ${e.value ? 'correct' : 'incorrect'}`);
        setAnswer('');
        evaluateAnswer(true);
        setIsSubmitted(false);
        fetchCard(true);
    };

    if (loading) {
        return (
            <div className="quiz-page">
                <Card className="quiz-card">
                    <div className="loading-container">
                        <ProgressSpinner />
                        <p>Loading question...</p>
                    </div>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="quiz-page">
                <Card className="quiz-card">
                    <Message 
                        severity="error" 
                        text={error}
                        className="error-message"
                    />
                    <Button 
                        label="Retry" 
                        icon="pi pi-refresh" 
                        onClick={fetchCard as any}
                        className="p-mt-3"
                    />
                </Card>
            </div>
        );
    }

    if (!currentCard) {
        return (
            <div className="quiz-page">
                <Card className="quiz-card">
                    <Message 
                        severity="info" 
                        text="No questions available, try again tomorrow!"
                    />
                </Card>
            </div>
        );
    }

    return (
        <div className="quiz-page">
            <Card title="Quiz" className="quiz-card">
                <div className="question-tracker">
                    <span>Question {currentQuestionNumber} of {totalCards}</span>
                </div>
                <div className="question-container">
                    <p data-testid="question-text">{currentCard.question}</p>
                </div>
                
                <div className="card flex justify-content-center flex-row p-field">
                    <FloatLabel>
                        <InputText 
                            id="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            disabled={isSubmitted}
                        />
                        <label htmlFor="answer">Your Answer</label>
                    </FloatLabel>
                </div>

                {!isSubmitted ? (
                    <Button 
                        label="Submit"
                        icon="pi pi-check"
                        onClick={handleSubmit}
                        className="p-mt-2"
                    />
                ) : (
                    <div className="validation-container">
                        <h3>Validate Answer</h3>
                        <p className="correct-answer">Correct answer: {currentCard.answer}</p>
                        <div className="validation-buttons">
                            <SelectButton 
                                options={validationOptions}
                                onChange={handleValidation}
                                className="p-mt-2"
                            />
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default QuizPage;
