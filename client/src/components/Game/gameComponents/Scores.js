import React from "react";
import "./Scores.css";

const Scores = ({ score, player }) => {
  return (
    <div className="scores">
      <span className={`score x-score ${player !== "X" && "inactive"}`}>
        X - {score.x}
      </span>
      <span className={`score o-score ${player === "X" && "inactive"}`}>
        O - {score.o}
      </span>
    </div>
  );
};

export default Scores;
