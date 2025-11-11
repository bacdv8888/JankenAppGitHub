import React from 'react';
import { Hand } from '../types';
import HandIcon from './HandIcon';
import { BORDER_COLORS } from '../constants';

interface HandButtonProps {
  hand: Hand;
  onClick: () => void;
  disabled: boolean;
}

const HandButton: React.FC<HandButtonProps> = ({ hand, onClick, disabled }) => {
  const borderColor = BORDER_COLORS[hand];
  const shadowColor = borderColor.replace('border-', 'shadow-').replace('-500', '');

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-20 h-20 md:w-32 md:h-32 rounded-full border-2 flex items-center justify-center 
                 bg-gray-800/50 backdrop-blur-sm transition-all duration-300 ease-in-out
                 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                 focus:outline-none focus:ring-4 focus:ring-opacity-50
                 ${borderColor} ${borderColor.replace('border-','focus:ring-')}`}
    >
        <div className={`absolute -inset-1 rounded-full blur-sm transition-all duration-300 opacity-0 group-hover:opacity-75 ${borderColor.replace('border-', 'bg-')}`}></div>
        <HandIcon hand={hand} className={hand === Hand.Scissors ? "text-3xl md:text-6xl text-white" : "text-4xl md:text-6xl text-white"} />
    </button>
  );
};

export default HandButton;