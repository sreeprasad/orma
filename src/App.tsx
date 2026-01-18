import { useState } from 'react';
import { Card } from './components/Card';
import { generateCards } from './utils/generateCards';
import type {Difficulty} from "./types";

function App() {
    const [cards, setCards] = useState(generateCards('easy'));
    const [flippedIds, setFlippedIds] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const isGameOver = cards.every(card => card.matched);
    const [difficulty, setDifficulty] = useState<Difficulty>('easy');

    const startGame = (level: Difficulty) => {
        setDifficulty(level);
        setCards(generateCards(level));
        setFlippedIds([]);
        setMoves(0);
    };

    const resetGame = () => {
        startGame(difficulty);
    };

    const gridCols = {
        easy: 'grid-cols-4',
        hard: 'grid-cols-7',
    };



    const gridGap = {
        easy: 'gap-2',
        hard: 'gap-1',
    };

    const gridAspect = {
        easy: 'aspect-[4/3]',    // 4 columns, 3 rows
        hard: 'aspect-[7/4]',    // 7 columns, 4 rows
    };




    const handleClick = (id: number) => {

        const clickedCard = cards.find(card => card.id === id);
        if (flippedIds.length === 2) return;
        if (clickedCard?.flipped || clickedCard?.matched) return;


        setCards(prevCards =>
            prevCards.map(card => card.id === id
                ? {...card, flipped: !card.flipped } :
                card
            )
        );

        const newFlippedIds = [...flippedIds, id];
        setFlippedIds(newFlippedIds);
        if (newFlippedIds.length === 2) {
            setMoves(prev => prev+1)
            const [firstId, secondId] = newFlippedIds;
            const firstCard = cards.find(card => card.id === firstId);
            const secondCard = cards.find(card => card.id === secondId);
            if (firstCard?.animalId === secondCard?.animalId){
                setCards(prevCards =>
                    prevCards.map(card => card.id === firstId || card.id === secondId
                        ? {...card, matched: true} :
                        card
                    )
                );

                setFlippedIds([])
            } else {
                setTimeout(() => {

                    setCards(prevCards =>
                        prevCards.map(card => card.id === firstId || card.id === secondId
                            ? {...card, flipped: false} :
                            card
                        )
                    );

                    setFlippedIds([])

                }, 1000)

            }
        }


    };




    return (
        <div className="h-screen p-8 flex flex-col bg-gray-900 overflow-hidden">
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-white">Memory Game</h1>

                <div className="my-2 flex justify-center gap-2">
                    <button
                        onClick={() => startGame('easy')}
                        className={`px-4 py-2 rounded ${difficulty === 'easy' ? 'bg-purple-600' : 'bg-gray-600'} text-white`}
                    >
                        Easy
                    </button>
                    <button
                        onClick={() => startGame('hard')}
                        className={`px-4 py-2 rounded ${difficulty === 'hard' ? 'bg-purple-600' : 'bg-gray-600'} text-white`}
                    >
                        Hard
                    </button>
                </div>

                <p className="text-white">Moves: {moves}</p>

                {isGameOver && (
                    <div className="mt-2">
                        <p className="text-green-400 text-xl">🎉 You Win!</p>
                        <button
                            onClick={resetGame}
                            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>

            {/* Grid container with constrained height */}
            <div className="flex-1 flex justify-center items-center overflow-hidden">
                <div className={`
    grid ${gridCols[difficulty]} ${gridGap[difficulty]}
    h-full ${gridAspect[difficulty]}
    max-h-full max-w-full
`}>
                    {cards.map(card => (
                        <Card
                            key={card.id}
                            card={card}
                            onClick={() => handleClick(card.id)}
                            disabled={false}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;