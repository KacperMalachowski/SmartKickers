<<<<<<< HEAD
import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/button";

function App() {
  let [blueScore, setBlueScore] = useState(0);
  let [whiteScore, setWhiteScore] = useState(0);
=======
import { useEffect, useState } from 'react';
import './App.css';
import { Button } from './components/Button';

function App() {
  const [blueScore, setBlueScore] = useState(0);
  const [whiteScore, setWhiteScore] = useState(0);
>>>>>>> 99348d90ce31f78996ed72bd5a8cc522d5425f9f

  const socket = new WebSocket("ws://localhost:3006/csc");

  useEffect(() => {
<<<<<<< HEAD
    socket.onopen = function () {
=======
    const socket = new WebSocket('ws://localhost:3006/csc');

    socket.onopen = function () {
      //send to server
      socket.send('Hello from client');
>>>>>>> 99348d90ce31f78996ed72bd5a8cc522d5425f9f
      socket.onmessage = (msg) => {
        msg = JSON.parse(msg.data);
        setBlueScore(msg.blueScore);
        setWhiteScore(msg.whiteScore);
      };
    };
  }, []);

  return (
    <>
      <h1>Smart Kickers</h1>
<<<<<<< HEAD
      <div className="game-result-container" data-testid="blue-team-score">
        Blue: {blueScore}
        {"   "}
        White: {whiteScore}
      </div>
      <center>
        <Button onClick={() => socket.send(JSON.stringify(true))}>
          Reset game
        </Button>
=======
      <div className="game-result-container">
        <p className="game-result-item">Blue: {blueScore}</p>
        <p className="game-result-item">White: {whiteScore}</p>
      </div>
      <center>
        <Button>Reset game</Button>
>>>>>>> 99348d90ce31f78996ed72bd5a8cc522d5425f9f
      </center>
    </>
  );
}

export default App;
