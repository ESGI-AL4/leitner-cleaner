import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import {createCard} from "../../infrastructure/api/CardRepository.ts";


const CreateCardPage: React.FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [tag, setTag] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleSubmit = async () => {
        if (!question.trim() || !answer.trim()) {
            setError("La question, la réponse et le tag sont requises.");
            setSuccess('');
            return;
        }

        setError('');
        const newCard = {
            question: question.trim(),
            answer: answer.trim(),
            tag: tag.trim() || undefined,
        };

        try {
            const createdCard = await createCard(newCard);
            console.log("Carte créée:", createdCard);
            setSuccess("Carte créée avec succès !");
            setQuestion('');
            setAnswer('');
            setTag('');
        } catch (err) {
            console.error(err);
            setError("Erreur lors de la création de la carte.");
            setSuccess('');
        }
    };

    return (
        <div className="create-card-page">
            <Card title="Créer une nouvelle fiche" className="create-card">
                <div className="p-field card flex justify-content-center flex-row">
                    <FloatLabel>
                        <InputText
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <label htmlFor="question">Question</label>
                    </FloatLabel>
                </div>
                <div className="p-field card flex justify-content-center flex-row">
                    <FloatLabel>
                        <InputText
                            id="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                        <label htmlFor="answer">Réponse</label>
                    </FloatLabel>
                </div>
                <div className="p-field card flex justify-content-center flex-row">
                    <FloatLabel>
                        <InputText
                            id="tag"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                        <label htmlFor="tag">Tag</label>
                    </FloatLabel>
                </div>
                <div className="p-field flex flex-column align-items-center">
                    {error && <small className="p-error">{error}</small>}
                    {success && <small className="p-success">{success}</small>}
                    <Button label="Créer la fiche" icon="pi pi-plus" onClick={handleSubmit} className="p-mt-2" />
                </div>
            </Card>
        </div>
    );
};

export default CreateCardPage;
