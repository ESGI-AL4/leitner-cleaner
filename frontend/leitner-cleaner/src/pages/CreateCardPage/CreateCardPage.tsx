import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';


const CreateCardPage: React.FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [tag, setTag] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleSubmit = () => {
        if (!question.trim() || !answer.trim()) {
            setError("La question et la réponse sont requises.");
            setSuccess('');
            return;
        }
        setError('');
        // Création de la carte avec la catégorie par défaut "1"
        const newCard = {
            id: Date.now().toString(),
            category: "1",
            question: question.trim(),
            answer: answer.trim(),
            tag: tag.trim() || undefined,
        };

        console.log("Carte créée:", newCard);
        setSuccess("Carte créée avec succès !");
        // Réinitialiser le formulaire
        setQuestion('');
        setAnswer('');
        setTag('');
    };

    return (
        <div className="create-card-page">
            <Card title="Créer une nouvelle fiche" className="create-card">
                <div className="p-field">
                    <FloatLabel>
                        <InputText
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <label htmlFor="question">Question</label>
                    </FloatLabel>
                </div>
                <div className="p-field">
                    <FloatLabel>
                        <InputText
                            id="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                        <label htmlFor="answer">Réponse</label>
                    </FloatLabel>
                </div>
                <div className="p-field">
                    <FloatLabel>
                        <InputText
                            id="tag"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                        <label htmlFor="tag">Tag (optionnel)</label>
                    </FloatLabel>
                </div>
                {error && <small className="p-error">{error}</small>}
                {success && <small className="p-success">{success}</small>}
                <Button label="Créer la fiche" icon="pi pi-plus" onClick={handleSubmit} className="p-mt-2" />
            </Card>
        </div>
    );
};

export default CreateCardPage;
