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
    } = useQuiz();

    const validationOptions = [
        { label: 'Correct', value: true, icon: 'pi pi-check' },
        { label: 'Incorrect', value: false, icon: 'pi pi-times' }
    ];

    const handleSubmit = () => {
        if (answer.trim()) {
            setIsSubmitted(true);
        }
    };

    const handleValidation = (e: SelectButtonChangeEvent) => {
        console.log(`Answer marked as ${e.value ? 'correct' : 'incorrect'}`);
        setAnswer('');
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
                        onClick={fetchCard}
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
                
                <div className="card justify-content-center p-field">
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
