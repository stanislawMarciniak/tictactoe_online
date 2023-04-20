import React from "react";
import "./Scores.css";

const Scores = ({ score, isX }) => {
  return (
    <div className="scores">
      <span className={`score x-score ${!isX && "inactive"}`}>
        X - {score.x}
      </span>
      <span className={`score o-score ${isX && "inactive"}`}>
        O - {score.o}
      </span>
    </div>
  );
};

export default Scores;
