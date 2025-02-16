import React, {useMemo, useState} from 'react';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {InputText} from 'primereact/inputtext';
import {CardType} from './CardItem';
import './CardsDisplay.css';
import {classNames} from "primereact/utils";
import {MultiSelect} from "primereact/multiselect";
import {InputIcon} from "primereact/inputicon";
import {IconField} from "primereact/iconfield";

interface CardsDisplayProps {
    cards: CardType[];
}

const CardsDisplay: React.FC<CardsDisplayProps> = ({cards}) => {
    const [layout, setLayout] = useState<'list' | 'grid'>('grid');
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Calculer les catégories et tags uniques à partir des cartes
    const uniqueCategories = useMemo(
        () => Array.from(new Set(cards.map(card => card.category))),
        [cards]
    );
    const uniqueTags = useMemo(
        () => Array.from(new Set(cards.map(card => card.tag).filter(Boolean))),
        [cards]
    );

    // Préparer les options pour les MultiSelect
    const categoryOptions = uniqueCategories.map(cat => ({ label: cat, value: cat }));
    const tagOptions = uniqueTags.map(tag => ({ label: tag, value: tag }));


    // Template pour l'affichage en grid (plusieurs cartes par ligne)
    const gridItem = (card: CardType) => {
        return (
            <div className="col-4 sm-6 lg-4" key={card.id}>
                <div className="card grid-card">
                    <h3>{card.question}</h3>
                    <p>{card.answer}</p>
                    <p>
                        <strong>Catégorie:</strong> {card.category}
                        {card.tag && (
                            <>
                                {" "}
                                <strong>Tag:</strong> {card.tag}
                            </>
                        )}
                    </p>
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
                        {'border-top-1 surface-border': index !== 0}
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

    const itemTemplate = (card: CardType, layout: "list" | "grid", index: number) => {
        if (!card) return null;
        return layout === 'list' ? listItem(card, index) : gridItem(card);
    };

    const listTemplate = (cards: CardType[], layout: "list" | "grid") => {
        return <div className={layout}>
            {cards.map((card: CardType, index: number) => itemTemplate(card, layout, index))}
        </div>;
    }

    // Header incluant le champ de recherche et les MultiSelect pour filtrer par catégories et par tags
    const header = () => {
        return (
            <div className="cards-display-header flex flex-row">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search"/>
                    <InputText
                        type="search"
                        onInput={(e) => setGlobalFilter(e.currentTarget.value)}
                        placeholder="Rechercher..."
                    />
                </IconField>
                <MultiSelect
                        value={selectedCategories}
                        options={categoryOptions}
                        onChange={(e) => setSelectedCategories(e.value)}
                        optionLabel="label"
                        display="chip"
                        placeholder="Filtrer par catégorie"
                        className="w-full md:w-20rem"
                />
                <MultiSelect
                        value={selectedTags}
                        options={tagOptions}
                        onChange={(e) => setSelectedTags(e.value)}
                        optionLabel="label"
                        display="chip"
                        placeholder="Filtrer par tag"
                        className="w-full md:w-20rem"
                />
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value as "list" | "grid")} />
            </div>
        );
    };

    // Filtrage des cartes en fonction du filtre global et des sélections MultiSelect
    const filteredCards = cards.filter(card => {
        const filterText = globalFilter.toLowerCase();
        const matchesGlobal =
            card.question.toLowerCase().includes(filterText) ||
            card.answer.toLowerCase().includes(filterText) ||
            (card.tag && card.tag.toLowerCase().includes(filterText));
        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(card.category);
        const matchesTag =
            selectedTags.length === 0 || (card.tag && selectedTags.includes(card.tag));
        return matchesGlobal && matchesCategory && matchesTag;
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
