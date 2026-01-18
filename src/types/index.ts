export type Difficulty = 'easy' | 'hard';
export type GameMode = 'single' | 'two-player';


export interface Animal {
    id: number;
    image: string;
}

export interface Card {
    id: number;
    animalId: number;
    image: string;
    flipped: boolean;
    matched: boolean;
}

export interface Player {
    id: 1 | 2;
    name: string;
    score: number;
    timeInMilliseconds: number;
}

export interface GameSetting {
    difficulty: Difficulty;
    mode: GameMode;
    showTimer: boolean;
    showMoves: boolean;
}

export interface GameState {
    cards: Card[];
    flippedCards: Card[];
    moves: number;
    currentPlayer: 1 | 2;
    players: Player[];
    isGameOver: boolean;
    isChecking: boolean;
}


