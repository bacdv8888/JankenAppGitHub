import { Hand } from './types';
import { Result } from './types';

export const HANDS: Hand[] = [Hand.Rock, Hand.Scissors, Hand.Paper];

export const HAND_JAPANESE: Record<Hand, string> = {
  [Hand.Rock]: 'グー',
  [Hand.Scissors]: 'チョキ',
  [Hand.Paper]: 'パー',
};

export const RESULT_MESSAGES: Record<Result, string> = {
  [Result.Win]: 'あなたの勝ち！',
  [Result.Lose]: 'あなたの負け...',
  [Result.Draw]: '引き分け',
};

export const RESULT_COLORS: Record<Result, string> = {
  [Result.Win]: 'text-cyan-400',
  [Result.Lose]: 'text-red-500',
  [Result.Draw]: 'text-yellow-400',
};

export const BORDER_COLORS: Record<Hand, string> = {
    [Hand.Rock]: 'border-red-500',
    [Hand.Paper]: 'border-blue-500',
    [Hand.Scissors]: 'border-yellow-500',
};