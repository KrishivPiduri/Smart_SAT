import { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import confetti from "canvas-confetti";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { fetchQuestionList, fetchQuestionDetail } from "./collegeBoardAPI";

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
    const [questionList, setQuestionList] = useState([]);
    const [index, setIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selected, setSelected] = useState(null);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        const loadQuestions = async () => {
            const data = await fetchQuestionList();
            if (Array.isArray(data)) {
                setQuestionList(data);
            } else {
                console.error("Unexpected question list format", data);
            }
        };
        loadQuestions();
    }, []);

    useEffect(() => {
        const loadQuestionDetail = async () => {
            if (questionList.length === 0) return;
            const external_id = questionList[index]?.external_id;
            if (!external_id) return;
            const detail = await fetchQuestionDetail(external_id);
            if (detail) {
                const parser = new DOMParser();
                const decodeHTML = (html) => parser.parseFromString(html, "text/html").body.innerHTML || "";

                const questionText = decodeHTML(detail.stem || "");
                const stimulus = decodeHTML(detail.stimulus || "");
                const choices = (detail.answerOptions || []).map((c) => decodeHTML(c.content || ""));
                const answerIndex = detail.correct_answer?.[0]?.toUpperCase().charCodeAt(0) - 65;
                const answer = choices[answerIndex] || "";

                setCurrentQuestion({ question: questionText, stimulus, choices, answer });
            }
        };
        loadQuestionDetail();
    }, [index, questionList]);

    const handleChoice = (choice) => {
        if (selected !== null || !currentQuestion) return;
        setSelected(choice);
        const isCorrect = choice === currentQuestion.answer;
        setFeedback(isCorrect ? "correct" : "incorrect");
        if (isCorrect) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
    };

    const nextQuestion = () => {
        setSelected(null);
        setFeedback(null);
        setIndex((prev) => (prev + 1) % questionList.length);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
                {questionList.length === 0 ? (
                    <p className="text-lg">Loading questions list...</p>
                ) : !currentQuestion ? (
                    <p className="text-lg">Loading question...</p>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mb-4 text-center">Question {index + 1}</h1>

                        {currentQuestion.stimulus && (
                            <div className="mb-6 text-left border border-gray-200 bg-gray-50 p-4 rounded-xl prose max-w-none" dangerouslySetInnerHTML={{ __html: currentQuestion.stimulus }} />
                        )}

                        <div className="text-left text-lg mb-6" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            {currentQuestion.choices.map((choice, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleChoice(choice)}
                                    className={`py-3 px-4 rounded-xl text-white font-semibold transition-colors duration-200 cursor-pointer ${
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
                                    <span dangerouslySetInnerHTML={{ __html: choice }} />
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
                                            Incorrect. The correct answer is:
                                        </p>
                                        <div
                                            className="text-red-600"
                                            dangerouslySetInnerHTML={{ __html: currentQuestion.answer }}
                                        />
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
                    </>
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
