import type { Card as CardType } from '../types';

interface CardProps {
    card: CardType;
    onClick: () => void;
    disabled: boolean;
}

export function Card({ card, onClick, disabled }: CardProps) {
    return (
        <button onClick={onClick} disabled={disabled}> {card.flipped ? ( <img src={card.image} alt="animal" /> ) : (
        <span>?</span>
    )}
    </button>
);
}