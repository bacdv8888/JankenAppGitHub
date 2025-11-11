
import React, { useState, useEffect, useCallback } from 'react';
import { Hand } from './types';
import { Result } from './types';
import { HANDS, RESULT_MESSAGES, RESULT_COLORS, BORDER_COLORS } from './constants';
import Scoreboard from './components/Scoreboard';
import HandButton from './components/HandButton';
import HandIcon from './components/HandIcon';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  const [playerHand, setPlayerHand] = useState<Hand | null>(null);
  const [computerHand, setComputerHand] = useState<Hand | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [isChoosing, setIsChoosing] = useState<boolean>(false);
  const [shuffledHand, setShuffledHand] = useState<Hand>(HANDS[0]);

  const determineWinner = useCallback((player: Hand, computer: Hand) => {
    if (player === computer) {
      return Result.Draw;
    }
    if (
      (player === Hand.Rock && computer === Hand.Scissors) ||
      (player === Hand.Scissors && computer === Hand.Paper) ||
      (player === Hand.Paper && computer === Hand.Rock)
    ) {
      return Result.Win;
    }
    return Result.Lose;
  }, []);

  useEffect(() => {
    if (playerHand && computerHand) {
      const gameResult = determineWinner(playerHand, computerHand);
      setResult(gameResult);
      if (gameResult === Result.Win) {
        setPlayerScore((score) => score + 1);
      } else if (gameResult === Result.Lose) {
        setComputerScore((score) => score + 1);
      }
    }
  }, [playerHand, computerHand, determineWinner]);

  const handlePlayerChoice = (hand: Hand) => {
    if (isChoosing) return;
    setPlayerHand(hand);
    setComputerHand(null);
    setResult(null);
    setIsChoosing(true);

    const shuffleInterval = setInterval(() => {
        setShuffledHand(HANDS[Math.floor(Math.random() * HANDS.length)]);
    }, 100);

    setTimeout(() => {
      clearInterval(shuffleInterval);
      const randomHand = HANDS[Math.floor(Math.random() * HANDS.length)];
      setComputerHand(randomHand);
      setIsChoosing(false);
    }, 2000);
  };

  const resetRound = () => {
    setPlayerHand(null);
    setComputerHand(null);
    setResult(null);
  };
  
  const resetGame = () => {
    resetRound();
    setPlayerScore(0);
    setComputerScore(0);
  }

  const HandDisplay: React.FC<{ hand: Hand | null; isPlayer: boolean; isShuffling?: boolean; shuffledHand?: Hand }> = ({ hand, isPlayer, isShuffling = false, shuffledHand }) => {
    const handToShow = isShuffling ? shuffledHand : hand;
    const borderColor = handToShow ? BORDER_COLORS[handToShow] : 'border-gray-600';

    return (
        <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-wider">{isPlayer ? 'あなた' : 'コンピューター'}</h2>
            <div className={`w-28 h-28 md:w-56 md:h-56 rounded-full border-8 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm transition-all duration-300 ${borderColor}`}>
                {handToShow ? <HandIcon hand={handToShow} className="text-4xl md:text-7xl text-white" /> : <div className="text-5xl text-gray-500">?</div>}
            </div>
        </div>
    )
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-gray-900 to-purple-900/50"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <main className="z-10 flex flex-col items-center justify-center w-full max-w-4xl flex-grow">
        <header className="w-full text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            じゃんけんゲーム
          </h1>
          <p className="text-gray-400 mt-2">コンピューターに挑戦しよう！</p>
        </header>

        <Scoreboard playerScore={playerScore} computerScore={computerScore} onReset={resetGame} />

        <div className="w-full flex items-center justify-around my-8 md:my-12 px-4 relative">
          <HandDisplay hand={playerHand} isPlayer={true} />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl md:text-6xl font-black text-gray-500">VS</div>
          
          <HandDisplay hand={computerHand} isPlayer={false} isShuffling={isChoosing} shuffledHand={shuffledHand} />
        </div>

        {result && <ResultDisplay result={result} onPlayAgain={resetRound} />}

        {!playerHand && (
            <div className="flex flex-col items-center space-y-4 mt-2">
                <p className="text-lg font-semibold text-gray-300">手を選んでください</p>
                <div className="flex space-x-2 md:space-x-8">
                    {HANDS.map((hand) => (
                        <HandButton key={hand} hand={hand} onClick={() => handlePlayerChoice(hand)} disabled={isChoosing} />
                    ))}
                </div>
            </div>
        )}
      </main>

      <footer className="z-10 text-center text-gray-500 py-4">
        <p>Created with React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;
