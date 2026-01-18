import { useState } from 'react';
import { Card } from './components/Card';
import { generateCards } from './utils/generateCards';

function App() {
    const [cards, setCards] = useState(generateCards('easy'));
    const [flippedIds, setFlippedIds] = useState<number[]>([]);

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
        <div className="h-screen p-4 flex flex-col items-center bg-gray-900">
            <h1 className="text-2xl font-bold mb-4 text-white">Memory Game</h1>
            <div className="grid grid-cols-4 gap-2 w-full max-w-4xl">
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
    );
}

export default App;