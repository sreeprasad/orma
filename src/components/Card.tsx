import type { Card as CardType } from '../types';

interface CardProps {
    card: CardType;
    onClick: () => void;
    disabled: boolean;
}

export function Card({ card, onClick, disabled }: CardProps) {
    const showFace = card.flipped || card.matched;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        w-full aspect-square rounded-lg overflow-hidden
        border-2 border-gray-300
        ${showFace ? 'bg-white' : 'bg-purple-600'}
        ${card.matched ? 'border-green-500 opacity-75' : ''}
        hover:scale-105 transition-transform
        disabled:cursor-not-allowed
      `}
        >
            {showFace ? (
                <img
                    src={card.image}
                    alt="animal"
                    className="w-full h-full object-cover"
                />
            ) : (
                <span className="text-4xl text-white">?</span>
            )}
        </button>
    );
}