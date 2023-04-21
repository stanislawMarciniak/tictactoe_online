import React from "react";
import "./Scores.css";

const Scores = ({ score, turn }) => {
  return (
    <div className="scores">
      <span className={`score x-score ${turn !== "X" && "inactive"}`}>
        X - {score.x}
      </span>
      <span className={`score o-score ${turn === "X" && "inactive"}`}>
        O - {score.o}
      </span>
    </div>
  );
};

export default Scores;
