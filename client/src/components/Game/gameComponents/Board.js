import React from "react";
import Box from "./Box";
import "./Board.css";

const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((value, i) => (
        <Box key={i} id={i} value={value} onClick={onClick} />
      ))}
    </div>
  );
};

export default Board;
