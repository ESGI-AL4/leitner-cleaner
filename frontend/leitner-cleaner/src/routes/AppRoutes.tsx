import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import CardsPage from "../pages/CardsPage/CardsPage.tsx";
import QuizPage from '../pages/QuizPage/QuizPage';
/*
import CreateCardPage from '../pages/CreateCardPage/CreateCardPage';
import CardsPage from '../pages/CardsPage/CardsPage';=
*/

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route de la page de connexion */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cards" element={<CardsPage />} />
                <Route path="/quiz" element={<QuizPage />} />
              
                {/* autres routes
                <Route path="/create-card" element={<CreateCardPage />} />
                <Route path="/cards" element={<CardsPage />} />
                */}            

                {/* Redirection par défaut vers la page de connexion */}
              
                <Route path="*" element={<Navigate to="/login" replace />} />
              
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
