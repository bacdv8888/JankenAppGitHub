
import React from 'react';
import { Result } from '../types';
import { RESULT_MESSAGES, RESULT_COLORS } from '../constants';

interface ResultDisplayProps {
  result: Result;
  onPlayAgain: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onPlayAgain }) => {
  const message = RESULT_MESSAGES[result];
  const color = RESULT_COLORS[result];

  return (
    <div className="flex flex-col items-center space-y-4 animate-fade-in">
      <p className={`text-4xl md:text-5xl font-extrabold ${color}`}>{message}</p>
      <button
        onClick={onPlayAgain}
        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300"
      >
        もう一度
      </button>
    </div>
  );
};

export default ResultDisplay;
