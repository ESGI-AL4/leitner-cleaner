// src/hooks/useCards.ts
import { useState, useEffect } from "react";
import { CardType } from "../components/cards/CardItem";

const useCards = () => {
    const [cards, setCards] = useState<CardType[]>([]);

    useEffect(() => {
        // Simuler le chargement des cartes avec des données factices réparties en 5 catégories
        const dummyCards: CardType[] = [
            {
                id: "1",
                category: "1",
                question: "What is pair programming?",
                answer: "A practice to work in pair on the same computer.",
                tag: "Teamwork",
            },
            {
                id: "2",
                category: "2",
                question: "What is 2+2?",
                answer: "4",
                tag: "Math",
            },
            {
                id: "3",
                category: "3",
                question: "What is Agile?",
                answer: "A methodology focused on iterative development.",
                tag: "Agile",
            },
            {
                id: "4",
                category: "4",
                question: "What is DevOps?",
                answer: "A practice combining software development and IT operations.",
                tag: "DevOps",
            },
            {
                id: "5",
                category: "5",
                question: "What is TDD?",
                answer: "Test Driven Development.",
                tag: "Testing",
            },
            {
                id: "6",
                category: "1",
                question: "What is React?",
                answer: "A JavaScript library for building user interfaces.",
                tag: "Frontend",
            },
            {
                id: "7",
                category: "2",
                question: "What is Node.js?",
                answer: "A JavaScript runtime built on Chrome's V8 engine.",
                tag: "Backend",
            },
            {
                id: "8",
                category: "3",
                question: "What is REST?",
                answer: "An architectural style for designing APIs.",
                tag: "API",
            },
            {
                id: "9",
                category: "4",
                question: "What is GraphQL?",
                answer: "A query language for APIs.",
                tag: "API",
            },
            {
                id: "10",
                category: "5",
                question: "What is Continuous Integration?",
                answer: "A practice to merge code changes frequently with automated testing.",
                tag: "CI/CD",
            },
            {
                id: "11",
                category: "1",
                question: "What is Continuous Deployment?",
                answer: "An automated software release process.",
                tag: "CI/CD",
            },
            {
                id: "12",
                category: "2",
                question: "What is Scrum?",
                answer: "An Agile framework for managing work.",
                tag: "Agile",
            },
            {
                id: "13",
                category: "3",
                question: "What is Kanban?",
                answer: "A visual method for managing workflow.",
                tag: "Agile",
            },
            {
                id: "14",
                category: "4",
                question: "What is a microservice?",
                answer: "A small, independent service within an application.",
                tag: "Architecture",
            },
            {
                id: "15",
                category: "5",
                question: "What is a monolith?",
                answer: "An application built as a single unified unit.",
                tag: "Architecture",
            },
            {
                id: "16",
                category: "1",
                question: "What are the benefits of pair programming?",
                answer: "Improves code quality and fosters knowledge sharing.",
                tag: "Teamwork",
            },
            {
                id: "17",
                category: "2",
                question: "What is refactoring?",
                answer: "Restructuring code without changing its behavior.",
                tag: "Coding",
            },
            {
                id: "18",
                category: "3",
                question: "What is version control?",
                answer: "A system to track and manage changes in source code.",
                tag: "Tools",
            },
            {
                id: "19",
                category: "4",
                question: "What is a pull request?",
                answer: "A request to merge code changes into a shared repository.",
                tag: "Git",
            },
            {
                id: "20",
                category: "5",
                question: "What is a code review?",
                answer: "A systematic examination of source code for quality and errors.",
                tag: "Quality",
            }
        ];
        setCards(dummyCards);
    }, []);

    return { cards, setCards };
};

export default useCards;
