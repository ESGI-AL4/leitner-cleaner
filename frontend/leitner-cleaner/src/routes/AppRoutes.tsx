import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import CardsPage from "../pages/CardsPage/CardsPage.tsx";
/*
import CreateCardPage from '../pages/CreateCardPage/CreateCardPage';
import CardsPage from '../pages/CardsPage/CardsPage';
import QuizPage from '../pages/QuizPage/QuizPage';
*/

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route de la page de connexion */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cards" element={<CardsPage />} />

                {/* autres routes
                <Route path="/create-card" element={<CreateCardPage />} />

                <Route path="/quiz" element={<QuizPage />} />
                */}

                {/* Redirection par défaut vers la page de connexion */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
