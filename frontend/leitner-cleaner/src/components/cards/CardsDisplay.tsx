import React, { useState } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import { CardType } from './CardItem'; // Votre interface pour les cartes
import './CardsDisplay.css';
import {classNames} from "primereact/utils";

interface CardsDisplayProps {
    cards: CardType[];
}

const CardsDisplay: React.FC<CardsDisplayProps> = ({ cards }) => {
    const [layout, setLayout] = useState<'list' | 'grid'>('grid');
    const [globalFilter, setGlobalFilter] = useState('');


    // Template pour l'affichage en grid (plusieurs cartes par ligne)
    const gridItem = (card: CardType) => {
        return (
            <div className="p-col-12 p-sm-6 p-lg-4" key={card.id}>
                <div className="card grid-card">
                    <h3>{card.question}</h3>
                    <p>{card.answer}</p>
                    <p><strong>Catégorie:</strong> {card.category}</p>
                    {card.tag && <p><strong>Tag:</strong> {card.tag}</p>}
                </div>
            </div>
        );
    };

    // Template pour l'affichage en list (une carte par ligne)
    const listItem = (card: CardType, index: number) => {
        return (
            <div className="p-col-12" key={card.id}>
                <div
                    className={classNames(
                        'flex flex-column xl:flex-row xl:align-items-start p-4 gap-4',
                        { 'border-top-1 surface-border': index !== 0 }
                    )}
                >
                    <h3>{card.question}</h3>
                    <p>{card.answer}</p>
                    <p><strong>Catégorie:</strong> {card.category}</p>
                    {card.tag && <p><strong>Tag:</strong> {card.tag}</p>}
                </div>
            </div>
        );
    };

    // Choix du template selon le layout
    const itemTemplate = (card: CardType, layout: "list" | "grid", index: number) => {
        if (!card) return null;
        return layout === 'list' ? listItem(card, index) : gridItem(card);
    };

    const listTemplate = (cards: CardType[], layout: "list" | "grid") => {
        return <div className="grid grid-nogutter">
            {cards.map((card: CardType, index: number) => itemTemplate(card, layout, index))}
        </div>;
    }

    // Header incluant un champ de recherche et l'option de layout
    const header = () => {
        return (
            <div className="cards-display-header flex justify-content-between align-items-center">
                <div className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        onInput={(e) => setGlobalFilter(e.currentTarget.value)}
                        placeholder="Rechercher..."
                    />
                </div>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value as "list" | "grid")} />
            </div>
        );
    };

    // Filtrer les cartes en fonction du champ de recherche (globalFilter)
    const filteredCards = cards.filter(card => {
        const filter = globalFilter.toLowerCase();
        return (
            card.question.toLowerCase().includes(filter) ||
            card.answer.toLowerCase().includes(filter) ||
            (card.tag && card.tag.toLowerCase().includes(filter))
        );
    });

    return (
        <div className="cards">
            <DataView
                value={filteredCards}
                layout={layout}
                header={header()}
                listTemplate={listTemplate}
                paginator
                rows={9}
                emptyMessage="Aucune carte trouvée."
            />
        </div>
    );
};

export default CardsDisplay;
