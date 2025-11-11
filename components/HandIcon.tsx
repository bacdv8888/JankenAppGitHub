import React from 'react';
import { Hand } from '../types';
import { HAND_JAPANESE } from '../constants';

interface HandIconProps {
  hand: Hand;
  className?: string;
}

const HandIcon: React.FC<HandIconProps> = ({ hand, className }) => {
  let finalClassName = className || '';

  // 「チョキ」は2文字で構成されており、大きなフォントサイズでは改行されてしまうため、
  // フォントサイズを小さくして1行に収まるように調整します。
  // 親コンポーネントから渡されるフォントサイズクラスをひと回り小さいものに置き換えています。
  if (hand === Hand.Scissors) {
    finalClassName = finalClassName
      .replace('text-7xl', 'text-6xl')
      .replace('md:text-8xl', 'md:text-7xl')
      .replace('text-5xl', 'text-4xl')
      .replace('md:text-6xl', 'md:text-5xl');
  }

  return (
    <span className={`font-black select-none inline-block ${finalClassName}`}>
      {HAND_JAPANESE[hand]}
    </span>
  );
};

export default HandIcon;
