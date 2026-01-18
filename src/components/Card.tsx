import type { Card as CardType } from '../types';

interface CardProps {
    card: CardType;
    onClick: () => void;
    disabled: boolean;
}

export function Card({ card, onClick, disabled }: CardProps) {
    const isFlipped = card.flipped || card.matched;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full aspect-square
                [perspective:1000px]
                disabled:cursor-not-allowed
            `}
        >
            <div className={`
                relative w-full h-full
                transition-transform duration-500
                [transform-style:preserve-3d]
                ${isFlipped ? '[transform:rotateY(180deg)]' : ''}
            `}>
         
                <div className={`
                    absolute w-full h-full
                    [backface-visibility:hidden]
                    bg-purple-600 rounded-lg
                    flex items-center justify-center
                    border-2 border-purple-400
                    hover:bg-purple-500
                `}>
                    <span className="text-4xl text-white">?</span>
                </div>


                <div className={`
                    absolute w-full h-full
                    [backface-visibility:hidden]
                    [transform:rotateY(180deg)]
                    rounded-lg overflow-hidden
                    border-2 ${card.matched ? 'border-green-500' : 'border-gray-300'}
                `}>
                    <img
                        src={card.image}
                        alt="animal"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </button>
    );
}