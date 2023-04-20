import React, { useState, useEffect } from "react";
import Board from "./gameComponents/Board";
import Scores from "./gameComponents/Scores";
import "./Game.css";

const WIN_CONDITION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Game({ channel }) {
  const [playersJoined, setplayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [turn, setTurn] = useState("X");
  const [score, setScore] = useState({ x: 0, o: 0 });
  const [endClick, setEndClick] = useState(false);
  const [isXStarted, setIsXStarted] = useState(true);

  const checkWin = () => {
    for (let i = 0; i < WIN_CONDITION.length; i++) {
      const [a, b, c] = WIN_CONDITION[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c])
        return true;
    }
    return false;
  };

  useEffect(() => {
    if (checkWin() && !endClick) {
      setScore(
        player === "X"
          ? { ...score, x: score.x + 1 }
          : { ...score, o: score.o + 1 }
      );
    } else if (board.some((x) => x !== null))
      setPlayer(player === "X" ? "O" : "X");

    document.body.addEventListener("click", handleKeyDown);
    return () => {
      document.body.removeEventListener("click", handleKeyDown);
    };
  }, [board, endClick]);

  const handleKeyDown = () => {
    if (checkWin() || board.every((x) => x !== null)) {
      setEndClick(true);
    }
    if (endClick) {
      setBoard(Array(9).fill(null));
      setEndClick(false);
      setPlayer(isXStarted ? "O" : "X");
      setIsXStarted(!isXStarted);
    }
  };

  channel.on("user.watching.start", (event) => {
    setplayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return <h1>Waiting for other player to join...</h1>;
  }

  const handleClick = (id) => {
    setTurn(player);
    const afterClicked = board.map((n, index) => (index === id ? player : n));
    setBoard(afterClicked);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setScore({ x: 0, o: 0 });
    setPlayer("X");
    setIsXStarted(true);
  };

  return (
    <div className="game">
      <Scores score={score} player={player} />
      <Board board={board} onClick={handleClick} />
      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default Game;
