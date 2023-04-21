import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
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
  const [isXStarted, setIsXStarted] = useState(true);

  const { client } = useChatContext();

  const checkWin = () => {
    for (let i = 0; i < WIN_CONDITION.length; i++) {
      const [a, b, c] = WIN_CONDITION[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c])
        return true;
    }
    return false;
  };

  const checkTie = () => {
    if (board.every((x) => x !== null)) return true;
  };

  useEffect(() => {
    if (checkWin()) {
      setScore(
        turn === "O"
          ? { ...score, x: score.x + 1 }
          : { ...score, o: score.o + 1 }
      );
    }
    document.body.addEventListener("click", handleKeyDown);
    return () => {
      document.body.removeEventListener("click", handleKeyDown);
    };
  }, [board]);

  const handleKeyDown = async () => {
    if (checkWin() || checkTie()) {
      await channel.sendEvent({
        type: "game-over",
      });
      setBoard(Array(9).fill(null));
      setIsXStarted(!isXStarted);
    }
  };

  channel.on("user.watching.start", (event) => {
    setplayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return (
      <div className="Game">
        <h1>Waiting for other player to join...</h1>
        <div class="custom-loader"></div>
      </div>
    );
  }

  const handleClick = async (clicked) => {
    if (turn === player && board[clicked] === null && !checkWin()) {
      setTurn(player === "X" ? "O" : "X");

      await channel.sendEvent({
        type: "game-move",
        data: { clicked, player },
      });
      const afterClicked = board.map((n, index) =>
        index === clicked ? player : n
      );
      setBoard(afterClicked);
    }
  };

  const handleReset = async () => {
    await channel.sendEvent({
      type: "reset",
    });
    setPlayer("X");
    setTurn("X");
    setIsXStarted(true);
  };

  channel.on((event) => {
    if (event.type == "game-move" && event.user.id !== client.userID) {
      const currentPlayer = event.data.player === "X" ? "O" : "X";
      setPlayer(currentPlayer);
      setTurn(currentPlayer);
      setBoard(
        board.map((val, idx) => {
          if (idx === event.data.clicked && val === null) {
            return event.data.player;
          }
          return val;
        })
      );
    }
    if (event.type == "reset") {
      setBoard(Array(9).fill(null));
      setScore({ x: 0, o: 0 });
      setPlayer("X");
      setTurn("X");
    }
    if (event.type == "game-over") {
      setBoard(Array(9).fill(null));
      setIsXStarted(!isXStarted);
    }
  });

  return (
    <div className="game">
      <Scores score={score} turn={turn} />
      <Board board={board} onClick={handleClick} />
      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default Game;
