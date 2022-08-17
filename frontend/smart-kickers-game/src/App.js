import { useEffect, useState } from 'react';
import './App.css';
import { resetGame } from './apis/resetGame';
import GameStatistics from './components/Game/GameStatistics.js';
import { initLibs } from './appConfig';
import config from './config';
import CurrentGameplay from './components/Game/CurrentGameplay';

function App() {
  const [blueScore, setBlueScore] = useState(0);
  const [whiteScore, setWhiteScore] = useState(0);
  const [isStatisticsDisplayed, setIsStatisticsDisplayed] = useState(true);
  const [finalScores, setFinalScores] = useState({ blue: 0, white: 0 });
  useEffect(() => {
    initLibs();
    const socket = new WebSocket(`${config.wsBaseUrl}/score`);

    socket.onopen = () => {
      // Send to server
      socket.send('Hello from client');
      socket.onmessage = (msg) => {
        msg = JSON.parse(msg.data);
        setBlueScore(msg.blueScore);
        setWhiteScore(msg.whiteScore);
      };
    };
  }, []);

  const handleResetGame = () => {
    resetGame().then((data) => {
      if (data.error) alert(data.error);
    });
  };
  const handleEndGame = () => {
    setFinalScores({ blue: blueScore, white: whiteScore });
    setIsStatisticsDisplayed(!isStatisticsDisplayed);
    handleResetGame();
  };
  return (
    <>
      <h1>Smart Kickers</h1>
      {isStatisticsDisplayed ? (
        <CurrentGameplay blueScore={blueScore} whiteScore={whiteScore} handleResetGame={handleResetGame} handleEndGame={handleEndGame} />
      ) : (
        <GameStatistics finalScores={finalScores} handleEndGame={handleEndGame} handleResetGame={handleResetGame} />
      )}
    </>
  );
}

export default App;
