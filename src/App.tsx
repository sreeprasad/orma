import { useState } from 'react';
import { Card } from './components/Card';
import { generateCards } from './utils/generateCards';

function App() {
    const [cards, setCards] = useState(generateCards('easy'));

    const handleClick = (id: number) => {
        setCards(prevCards =>
            prevCards.map(card => card.id === id
                ? {...card, flipped: !card.flipped } :
                card
            )
        );
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Memory Game</h1>
            <div className="grid grid-cols-4 gap-4">
                {cards.map(card => (
                    <Card
                        key={card.id}
                        card={card}
                        onClick={()=> handleClick(card.id)}
                        disabled={false}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;