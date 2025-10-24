
import React, { useState, FormEvent, ChangeEvent, FC } from 'react';

const questions: string[] = [
  "첫 번째 단서: 시작의 날",
  "두 번째 단서: 봄의 약속",
  "세 번째 단서: 네 자리의 비밀번호",
  "마지막 단서: 모든 것이 시작된 그 날"
];

const CORRECT_ANSWER = "0410";

const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06L11.25 12.69l-1.78-1.78a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l5.25-5.25Z" clipRule="evenodd" />
  </svg>
);

const LockIcon: FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
  </svg>
);


const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (userInput.trim() === CORRECT_ANSWER) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        setIsCompleted(true);
      }
      setUserInput('');
      setIsWrong(false);
    } else {
      setIsWrong(true);
      setUserInput('');
      setTimeout(() => setIsWrong(false), 500); // Reset shake animation
    }
  };

  const resetGame = (): void => {
    setCurrentQuestionIndex(0);
    setUserInput('');
    setIsCompleted(false);
    setIsWrong(false);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transition-all duration-500 ease-in-out">
        {isCompleted ? (
          <div className="text-center animate-fade-in">
            <CheckIcon className="w-24 h-24 text-green-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
            <p className="text-gray-300 mb-8">You've unlocked the secret.</p>
            <button
              onClick={resetGame}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2 text-gray-400">
                <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
                <LockIcon className="w-5 h-5" />
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercentage}%` }}>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-200 h-16 flex items-center justify-center">
              {questions[currentQuestionIndex]}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                className={`w-full p-4 text-center text-lg bg-gray-700 border-2 rounded-lg outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 text-white ${isWrong ? 'shake border-red-500' : 'border-gray-600'}`}
                placeholder="Enter the 4-digit code"
                maxLength={4}
                autoFocus
              />
              <button
                type="submit"
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
                disabled={!userInput}
              >
                Unlock
              </button>
            </form>
          </div>
        )}
      </div>
      <footer className="absolute bottom-4 text-gray-600 text-sm">
        Created for GitHub Deployment
      </footer>
    </div>
  );
};

export default App;
