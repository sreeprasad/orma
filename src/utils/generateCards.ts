import type {Animal, Card, Difficulty} from '../types';
import {ANIMALS} from '../data/animals';
import {shuffle} from './shuffle';


const PAIRS_BY_DIFFICULTY: Record<Difficulty, number> = {
    easy: 6,
    medium: 14,
    hard: 28,
};

export function generateCards(difficulty: Difficulty): Card[] {

    const pairCount = PAIRS_BY_DIFFICULTY[difficulty];
    const selectedAnimals = ANIMALS.slice(0, pairCount);

    function createCard(index: number, animal: Animal): Card {
        return {
            id: index,
            animalId: animal.id,
            image: animal.image,
            flipped: false,
            matched: false,
        };
    }
    const cards: Card[] = selectedAnimals.flatMap((animal, index) => [
        createCard((index*2), animal),
        createCard((index*2)+1, animal)
    ])
    return shuffle(cards)
}

