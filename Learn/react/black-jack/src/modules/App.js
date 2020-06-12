import React, {useState} from 'react';
import './App.css';
import Table from './table/table.component';
import Title from './title/title.component';

function App() {
    const [isGameStarted, setIsGameStarted] = useState(false);

    const playGame = () => {
        setIsGameStarted(true);
    };

  return (
    <div className="App">
        <Title text="Blackjack" />
        <div onClick={playGame} className="play-btn">Play</div>
        <Table isGameStarted={isGameStarted} />
    </div>
  );
}

export default App;
