
import React from 'react';

interface ScoreboardProps {
  playerScore: number;
  computerScore: number;
  onReset: () => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ playerScore, computerScore, onReset }) => {
  return (
    <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-700 flex items-center justify-between">
      <div className="text-center">
        <div className="text-sm font-medium text-cyan-400">あなた</div>
        <div className="text-3xl font-bold">{playerScore}</div>
      </div>
      <div className="text-center">
        <button onClick={onReset} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-xs font-semibold tracking-wider transition-colors duration-200">
            RESET
        </button>
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-purple-400">コンピューター</div>
        <div className="text-3xl font-bold">{computerScore}</div>
      </div>
    </div>
  );
};

export default Scoreboard;
