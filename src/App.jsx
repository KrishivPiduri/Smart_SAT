import { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import confetti from "canvas-confetti";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const questions = [
    {
        question: "What is the value of x if 2x + 3 = 7?",
        choices: ["1", "2", "3", "4"],
        answer: "2",
    },
    {
        question: "If f(x) = 2x + 5, what is f(3)?",
        choices: ["11", "10", "9", "8"],
        answer: "11",
    },
];

function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-4xl font-bold mb-4">SAT Practice App</h1>
            <p className="text-lg mb-6">Sharpen your SAT skills with fun, interactive quizzes!</p>
            <Link to="/quiz">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition">
                    Start Quiz
                </button>
            </Link>
        </div>
    );
}

function QuizPage() {
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const currentQuestion = questions[index];

    const handleChoice = (choice) => {
        if (selected !== null) return;
        setSelected(choice);
        const isCorrect = choice === currentQuestion.answer;
        setFeedback(isCorrect ? "correct" : "incorrect");
        if (isCorrect) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
        }
    };

    const nextQuestion = () => {
        setSelected(null);
        setFeedback(null);
        setIndex((prev) => (prev + 1) % questions.length);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Question {index + 1}</h1>
                <p className="text-lg mb-6">{currentQuestion.question}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {currentQuestion.choices.map((choice, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleChoice(choice)}
                            className={`py-3 px-4 rounded-xl text-white font-semibold transition-colors duration-200 cursor pointer ${
                                selected === null
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : choice === currentQuestion.answer
                                        ? "bg-green-500"
                                        : selected === choice
                                            ? "bg-red-500"
                                            : "bg-gray-300 text-gray-700"
                            }`}
                            disabled={selected !== null}
                        >
                            {choice}
                        </button>
                    ))}
                </div>
                {feedback && (
                    <div className="flex flex-col items-center gap-2 mb-4">
                        {feedback === "correct" ? (
                            <>
                                <CheckCircleIcon className="text-green-600 w-6 h-6" />
                                <p className="text-green-600 font-semibold">Correct!</p>
                            </>
                        ) : (
                            <>
                                <XCircleIcon className="text-red-600 w-6 h-6" />
                                <p className="text-red-600 font-semibold">
                                    Incorrect. The correct answer is "{currentQuestion.answer}".
                                </p>
                            </>
                        )}
                        <button
                            onClick={nextQuestion}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                        >
                            Next Question
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/quiz" element={<QuizPage />} />
            </Routes>
        </Router>
    );
}
