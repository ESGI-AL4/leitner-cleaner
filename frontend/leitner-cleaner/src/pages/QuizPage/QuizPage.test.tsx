import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuizPage from './QuizPage';
import '@testing-library/jest-dom';

// Mock the fetch function
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('QuizPage', () => {
    beforeEach(() => {
        mockFetch.mockReset();
    });

    test('shows loading state initially', () => {
        mockFetch.mockImplementationOnce(() => new Promise(() => {}));
        render(<QuizPage />);
        
        expect(screen.getByText(/loading question/i)).toBeInTheDocument();
    });

    test('shows error message when fetch fails', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Failed to fetch'));
        render(<QuizPage />);
        
        await waitFor(() => {
            expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
        });
    });

    test('renders the quiz page with fetched question', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([{
                id: 1,
                question: "What is the capital of France?",
                answer: "Paris"
            }])
        });

        render(<QuizPage />);
        
        await waitFor(() => {
            expect(screen.getByText(/what is the capital of france/i)).toBeInTheDocument();
        });
        expect(screen.getByLabelText(/your answer/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    test('shows validation options and correct answer after submitting', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([{
                id: 1,
                question: "What is the capital of France?",
                answer: "Paris"
            }])
        });

        render(<QuizPage />);
        
        await waitFor(() => {
            expect(screen.getByText(/what is the capital of france/i)).toBeInTheDocument();
        });

        const answerInput = screen.getByLabelText(/your answer/i);
        const submitButton = screen.getByRole('button', { name: /submit/i });

        fireEvent.change(answerInput, { target: { value: 'test answer' } });
        fireEvent.click(submitButton);

        expect(screen.getByText(/correct answer: paris/i)).toBeInTheDocument();
        expect(screen.getByText('Correct')).toBeInTheDocument();
        expect(screen.getByText('Incorrect')).toBeInTheDocument();
    });
});
